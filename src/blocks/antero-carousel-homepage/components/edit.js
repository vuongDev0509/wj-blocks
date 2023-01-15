import { Fragment } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/block-editor'
import Inspector from './inspector'

const MY_TEMPLATE = [	
	['core/heading', { "textAlign": "right", "level": "2", "placeholder": "Your heading", content: 'Your Heading Here', "textColor": "white-colour", "style": { "typography": { "fontSize": "60px" } } }],
	['antero-block/antero-spacer', { size: { default: '10px', tablet: '10px', mobile: '10px', sync: false } }],
	['core/paragraph', { "align": "right", content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', "placeholder": "Your paragraph", "style": { "typography": { "fontSize": "18px" } }, "textColor": "white-colour" }],
	['antero-block/antero-spacer', { size: { default: '10px', tablet: '10px', mobile: '10px', sync: false } }],
	['core/buttons',
		{ "layout": { "type": "flex", "justifyContent": "right" } },
		[['core/button', { 'text': 'Push the button', 'className': 'is-style-antero-emblem-white' }]]
	]
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
			<div className={['antero-carousel-item-block', className].join(' ')} style={styles}>
				<div className='antero-carousel-item-block-inner'>
					<div className='antero-carousel-item-block-inner-wrap-frame'>
						<div className='antero-carousel-item-block-inner-wrap-mask'>
							<img src={imgUrl} alt="carousel" style={{ objectPosition: focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined }}/>
						</div> 
					</div>
					<div className='antero-carousel-item-block-inner-wrap-bg' style={{ background: bgGradientColor ? bgGradientColor : bgColor }}></div>
					<div className='antero-carousel-container'>
						<div className='antero-carousel-container-content' style={{ maxWidth: `${containerWidth}px` }}>
							<InnerBlocks template={MY_TEMPLATE} />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Edit