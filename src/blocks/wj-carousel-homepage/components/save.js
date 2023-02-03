import { InnerBlocks } from '@wordpress/block-editor'

const Save = (props) => {
	const { attributes, className } = props
	const { imgUrl, focalPoint, containerWidth, bgColor, bgGradientColor, srcSet, containerPaddingTop, containerPaddingBottom } = attributes
	
	const styles = {			
		'--paddingBottom': containerPaddingBottom.default,
		'--paddingBottomTablet': containerPaddingBottom.tablet,
		'--paddingTop': containerPaddingTop.default,
		'--paddingTopTablet': containerPaddingTop.tablet, 
	};
	
	return (
		<div className={['wj-carousel-item-block swiper-slide', className].join(' ')} style={styles}>
			<div className='wj-carousel-item-block-inner'
				style={{
					backgroundImage: `url(${imgUrl})`,
				}}
			> 
				<div className='wj-carousel-item-block-container'> 
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	)
}

export default Save