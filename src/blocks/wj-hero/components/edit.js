import { Fragment } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/block-editor'
import Inspector from './inspector'
import HeroSection from './hero-section';

const MY_TEMPLATE = [
	['core/heading', { "level": 1, "placeholder": "Your Heading", "textColor": "white-colour", content: 'Your Heading Here' }],
	['wj-block/wj-spacer', { size: { default: '30px', tablet: '30px', mobile: '30px', sync: false } }],
	['core/heading', {"textAlign": "center", "level": 4, "placeholder": "Your Heading", "textColor": "white-colour", content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }],
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
					className='wj-hero-block-inner'
					style={{ background: bgGradientColor ? bgGradientColor : bgColor, '--background': bgGradientColor ? bgGradientColor : bgColor }}
				>
					<div className='wj-hero-block-inner--bg'>
						<img src={imgUrl} alt="Image" style={{ 'objectPosition': focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined }} />
					</div>
					<div className='wj-hero-block-inner-content'>
						<div className='wj-hero-block-inner-content__inner'> <InnerBlocks template={MY_TEMPLATE} /> </div>
					</div>
				</div>
			</HeroSection>
		</Fragment>
	)
}

export default Edit