import { __ } from '@wordpress/i18n'
import { Fragment} from '@wordpress/element'
import {InnerBlocks} from '@wordpress/block-editor'
import Inspector from './inspector';

const MY_TEMPLATE = [
	['core/heading', { "textAlign": "Left", "level": "5", "placeholder": "Your heading", content: 'Tue-Thu: 4pm - 9pm   |   Fri-Sat: 12pm - 10pM   |   Sunday: 10 am - 3 pm', "textColor": "#fff", "style": { "typography": { "fontSize": "18px" } } }],
];

const Edit = (props) => {
	const { attributes, className, setAttributes  } = props;
    const { heading  } = attributes;
    
	return (
        <Fragment>
            <Inspector {...props} />
            <div className={['wj-info-text-block', 'block-editor', props.className].join(' ')}>
                <div className='wj-info-text-block-inner'> 
                    <div className='wj-info-text-block-name'> 
                        <span> {heading} </span> 
                    </div>
                    <div className='wj-info-text-block-content'> 
                        <div className='wj-info-text-block-content__inner'>
							<InnerBlocks template={MY_TEMPLATE} />
						</div>
                    </div>
                </div>  
            </div>
        </Fragment>
	)
}

export default Edit;