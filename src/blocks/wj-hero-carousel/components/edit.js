import { Fragment, useEffect } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/block-editor'
import Inspector from './inspector'
import HeroSection from './hero-section';
import ImagesSliders from './images-sliders'

const MY_TEMPLATE = [
	['core/heading', { "level": 1,  'className': 'cssanimation sequence leFlyInBottom heading', "placeholder": "Your Heading", "textColor": "white-colour", content: 'Your Heading Here' }],
	['wj-block/wj-spacer', { size: { default: '30px', tablet: '30px', mobile: '30px', sync: true } }],
	['core/heading', {"textAlign": "center", "level": 4, "placeholder": "Your Heading", "textColor": "white-colour", content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }],
	['wj-block/wj-spacer', { size: { default: '0px', tablet: '0px', mobile: '40px', sync: true } }],
];

const Edit = (props) => {
	const { attributes, setAttributes, className, clientId } = props
	const {
		imgUrl,
		focalPoint,
		bgColor,
		bgGradientColor,
		id
	} = attributes

	useEffect(() => {
		setAttributes({ id: 'wj-' + clientId })	
	}, [id])

	return (
		<Fragment>
			<Inspector {...props} />
			<HeroSection {...props}>
				<div
					className='wj-hero-carousel-block-inner'
					style={{ background: bgGradientColor ? bgGradientColor : bgColor, '--background': bgGradientColor ? bgGradientColor : bgColor }}
				>
					<div className='wj-hero-carousel-block-inner--bg block-edit'>
						<div className='wj-hero-carousel-block-inner--bg-warp'> <ImagesSliders {...props} /> </div>
					</div>
					<div className='wj-hero-carousel-block-inner-content'>
						<div className='wj-hero-carousel-block-inner-content__inner'> <InnerBlocks template={MY_TEMPLATE} /> </div>
					</div>
				</div>
			</HeroSection>
		</Fragment>
	)
}

export default Edit