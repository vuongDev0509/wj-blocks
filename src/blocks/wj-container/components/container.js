/**
 * Container wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class Container extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		// Setup the attributes
		const {
			attributes: {
				containerBackgroundColor,
				containerBgGradientColor,
				containerAlignment,
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerImgURL,
				containerImgAlt,
				containerDimRatio,
				opacityBg
			},
		} = this.props;

		const styles = {			
			textAlign: containerAlignment ? containerAlignment : undefined,
			paddingLeft: containerPaddingLeft
				? `${containerPaddingLeft}%`
				: undefined,
			paddingRight: containerPaddingRight
				? `${containerPaddingRight}%`
				: undefined,
			'--paddingBottom': containerPaddingBottom.default,
			'--paddingBottomTablet': containerPaddingBottom.tablet,
			'--paddingBottomMobile': containerPaddingBottom.mobile,
			'--paddingTop': containerPaddingTop.default,
			'--paddingTopTablet': containerPaddingTop.tablet,
			'--paddingTopMobile': containerPaddingTop.mobile,
			marginTop: containerMarginTop
				? `${containerMarginTop}%`
				: undefined,
			marginBottom: containerMarginBottom
				? `${containerMarginBottom}%`
				: undefined,
				backgroundColor: containerBgGradientColor ? '#FFF' : ''
		};

		const className = classnames(
			[this.props.className, 'wj-block-container'],
			{
				['align' + containerWidth]: containerWidth,
			}
		);

		return (
			<div
				style={styles}
				className={className ? className : undefined}
				data-aos=""
			>
				<div className='wj-container-bg' style={{ background: containerBgGradientColor ? containerBgGradientColor : containerBackgroundColor ? containerBackgroundColor : '', opacity: opacityBg }}></div>
				<div className="wj-container-inside">
					{containerImgURL && !!containerImgURL.length && (
						<div className="wj-container-image-wrap">
							<img
								className={classnames(
									'wj-container-image',
									dimRatioToClass(containerDimRatio),
									{
										'has-background-dim':
											0 !== containerDimRatio,
									}
								)}
								src={containerImgURL}
								alt={containerImgAlt}
							/>
						</div>
					)}

					<div
						className="container"
						style={{
							maxWidth: containerMaxWidth
								? `${containerMaxWidth}px`
								: undefined,
						}}
					>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

function dimRatioToClass(ratio) {
	return 0 === ratio || 50 === ratio
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}
