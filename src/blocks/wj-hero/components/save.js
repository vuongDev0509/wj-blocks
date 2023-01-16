import { InnerBlocks } from '@wordpress/block-editor'
import HeroSection from './hero-section'
const Save = (props) => {
	const { attributes, className } = props
	const { imgUrl, focalPoint, containerWidth, bgColor, bgGradientColor, srcSet } = attributes
	return (
		<HeroSection {...props}>
			<div
				className='wj-hero-block-inner'
				style={{ background: bgGradientColor ? bgGradientColor : bgColor, '--background': bgGradientColor ? bgGradientColor : bgColor }}
			>
				<div className='wj-hero-block-inner--bg'>
					<img src={imgUrl} srcset={srcSet} alt="Image" style={{ 'objectPosition': focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined }} />
				</div>

				<div className='wj-hero-block-inner-content'>
					<div className='wj-hero-block-inner-content__inner'>  <InnerBlocks.Content /> </div>
				</div>
			</div>
		</HeroSection>
	)
}

export default Save