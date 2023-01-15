/**
 * Hero Section Block Wrapper
 */

const HeroSection = (props) => {
	// Setup the attributes
	const { attributes, className } = props;
	const { blockPaddingBottom, blockPaddingTop } = attributes
	return (
		<div className={['antero-hero-block', className].join(' ')}
			style={{
				'--paddingBottom': blockPaddingBottom.default,
				'--paddingBottomTablet': blockPaddingBottom.tablet,
				'--paddingBottomMobile': blockPaddingBottom.mobile,
				'--paddingTop': blockPaddingTop.default,
				'--paddingTopTablet': blockPaddingTop.tablet,
				'--paddingTopMobile': blockPaddingTop.mobile,
			}}>
			{props.children}
		</div>
	)
}

export default HeroSection;