import { InnerBlocks } from '@wordpress/block-editor'
import HeroSection from './hero-section'
import ImagesSliders from './images-sliders'
const Save = (props) => {
	const { attributes, className } = props
	const { bgColor, bgGradientColor } = attributes
	return (
		<HeroSection {...props}>
			<div
				className='wj-hero-carousel-block-inner'
				style={{ background: bgGradientColor ? bgGradientColor : bgColor, '--background': bgGradientColor ? bgGradientColor : bgColor }}
			>
				<div className='wj-hero-carousel-block-inner--bg'>
					<div className='wj-hero-carousel-block-inner--bg-warp'> <ImagesSliders {...props} /> </div>
				</div>

				<div className='wj-hero-carousel-block-inner-content'>
					<div className='wj-hero-carousel-block-inner-content__inner'>  <InnerBlocks.Content /> </div>
				</div>
			</div>
		</HeroSection>
	)
}

export default Save