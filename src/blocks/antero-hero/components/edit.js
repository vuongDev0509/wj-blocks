import { Fragment } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/block-editor'
import Inspector from './inspector'
import HeroSection from './hero-section';

const MY_TEMPLATE = [
	['core/heading', { "level": 1, "placeholder": "Your Heading", "textColor": "white-colour", content: 'Your Heading Here' }],
	['antero-block/antero-spacer', { size: { default: '10px', tablet: '10px', mobile: '10px', sync: false } }],
	['core/paragraph', { content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', "placeholder": "Your paragraph", "style": { "typography": { "fontSize": "20px", "lineHeight": "30px" } }, "textColor": "white-colour" }],
];

const Edit = (props) => {
	const { attributes, setAttributes, className } = props
	const {
		imgUrl,
		focalPoint,
		bgColor,
		bgGradientColor
	} = attributes

	return (
		<Fragment>
			<Inspector {...props} />
			<HeroSection {...props}>
				<div
					className='antero-hero-block-inner'
					style={{ background: bgGradientColor ? bgGradientColor : bgColor, '--background': bgGradientColor ? bgGradientColor : bgColor }}
				>
					<div className='antero-hero-block-inner--bg'>
						<img src={imgUrl} alt="Image" style={{ 'objectPosition': focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined }} />
						<span className='antero-hero-block-inner--bg-overlay'></span>
					</div>
					<div className='container'>
						<div className='antero-default-hero-block-inner-content'>
							<InnerBlocks template={MY_TEMPLATE} />
						</div>
					</div>
				</div>
			</HeroSection>
		</Fragment>
	)
}

export default Edit