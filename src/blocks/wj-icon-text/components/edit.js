import { __ } from '@wordpress/i18n'
import { Fragment} from '@wordpress/element'
import {InnerBlocks} from '@wordpress/block-editor'
import Inspector from './inspector';

const MY_TEMPLATE = [
    ['wj-block/wj-spacer', { size: { default: '50px', tablet: '50px', mobile: '50px', sync: false } }],
	['core/heading', { "textAlign": "Left", "level": "3", "placeholder": "Your heading", content: 'Your Heading Here', "textColor": "#d3ccc8", "style": { "typography": { "fontSize": "40px" } } }],
];

const Edit = (props) => {
	const { attributes, className, setAttributes  } = props;
    const { heading, imgUrl, colorHeading, bgColor, ctaBgHover, widthHeading } = attributes;
    let bgCtaHv = ctaBgHover ? ctaBgHover : 'linear-gradient(35.16deg, #d3186d -2.92%, #ef3e41 102.24%)';
	return (
        <Fragment>
            <Inspector {...props} />
            <div className={['wj-icon-text-block', 'block-editor', props.className].join(' ')}>
                <div className='wj-icon-text-block-inner'> 
                    <div className='wj-icon-text-block-icon'> <img src={imgUrl} alt="icon" /></div>
                    <div className='wj-icon-text-block-content'> 
                        <div className='wj-icon-text-block-content__inner'>
							<InnerBlocks template={MY_TEMPLATE} />
						</div>
                    </div>
                </div>  
            </div>
        </Fragment>
	)
}

export default Edit;