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
		<div className={['antero-carousel-item-block', className].join(' ')} style={styles}>
			<div
				className='antero-carousel-item-block-inner'>
				<div className='antero-carousel-item-block-inner-wrap-frame'>
					<div className='antero-carousel-item-block-inner-wrap-mask'>
						<img src={imgUrl} srcset={srcSet} alt="carousel" style={{ objectPosition: focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined }}/>
					</div>
				</div>
				<div className='antero-carousel-item-block-inner-wrap-bg' style={{ background: bgGradientColor ? bgGradientColor : bgColor }}></div>
				<div className='antero-carousel-container'>
					<div className='antero-carousel-container-content' style={{ maxWidth: `${containerWidth}px` }}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Save