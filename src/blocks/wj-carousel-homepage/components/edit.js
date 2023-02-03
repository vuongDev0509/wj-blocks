import { Fragment } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/block-editor'
import Inspector from './inspector'

const MY_TEMPLATE = [
	['wj-block/wj-spacer', { size: { default: '180px', tablet: '200px', mobile: '140px', sync: false } }],	
	['wj-blocks/hero']
];

const Edit = (props) => {
	const { attributes, className } = props
	const { imgUrl, focalPoint, containerWidth, bgColor, bgGradientColor, containerPaddingTop, containerPaddingBottom } = attributes

	const styles = {			
		'--paddingBottom': containerPaddingBottom.default,
		'--paddingBottomTablet': containerPaddingBottom.tablet,
		'--paddingTop': containerPaddingTop.default,
		'--paddingTopTablet': containerPaddingTop.tablet
	};


	return (
		<Fragment>
			<Inspector {...props} />
			<div className={['wj-carousel-item-block', className].join(' ')} style={styles}>
				<div className='wj-carousel-item-block-inner'
					style={{
						backgroundImage: `url(${imgUrl})`,
					}}
				> 
					<div className='wj-carousel-item-block-container'> 
					<InnerBlocks template={MY_TEMPLATE} />
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Edit