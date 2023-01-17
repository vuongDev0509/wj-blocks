import { InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
	const { attributes, className } = props;
	const { heading  } = attributes;
    
    return (
        <div className={['wj-info-text-block', props.className].join(' ')}>
            <div className='wj-info-text-block-inner'> 
                <div className='wj-info-text-block-name'> 
                    <span> {heading} </span>
                </div>
                <div className='wj-info-text-block-content'> 
                    <div className='wj-info-text-block-content__inner'>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>  
        </div>
	)
}

export default Save;