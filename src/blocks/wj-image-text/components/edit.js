import { __ } from '@wordpress/i18n'
import { Fragment} from '@wordpress/element'
import {InnerBlocks} from '@wordpress/block-editor'
import Inspector from './inspector';

const MY_TEMPLATE = [
    ['wj-block/wj-spacer', { size: { default: '50px', tablet: '50px', mobile: '50px', sync: false } }],
	['core/paragraph', { content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', "placeholder": "Your paragraph", "style": { "typography": { "fontSize": "20px", "lineHeight": "30px" } }, "textColor": "white-colour" }],
    ['wj-block/wj-spacer', { size: { default: '30px', tablet: '30px', mobile: '30px', sync: false } }],
    ['core/buttons',
        { "layout": { "type": "flex", "justifyContent": "left" } },
        [['core/button', { 'text': 'Learn More'}]]
    ]
];

const Edit = (props) => {
	const { attributes, className, setAttributes  } = props;
    const { heading, imgUrl, colorHeading, bgColor, ctaBgHover, widthHeading } = attributes;
    let bgCtaHv = ctaBgHover ? ctaBgHover : 'linear-gradient(35.16deg, #d3186d -2.92%, #ef3e41 102.24%)';
	return (
        <Fragment>
            <Inspector {...props} />
            <div className={['wj-images-text-block', 'block-editor', props.className].join(' ')}>
                <div className='wj-images-text-block-inner'
                    style={{
                        backgroundColor: bgColor
                    }}
                > 
                    <div className='wj-images-text-block-image' 
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                        }}
                    > 
                    </div>
                    <div className='wj-images-text-block-content'> 
                        <h2 className='heading'
                            style={{
                                color: colorHeading,
                                maxWidth: `${widthHeading}%`,
                            }}
                            > {heading} 
                        </h2>
                        <div className='wj-images-text-block-content__inner'>
							<InnerBlocks template={MY_TEMPLATE} />
						</div>
                    </div>
                </div>  
            </div>
        </Fragment>
	)
}

export default Edit;