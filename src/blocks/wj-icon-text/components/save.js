import { InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
	const { attributes, className } = props;
	const { imgUrl, widthImage } = attributes;
    
    return (
        <div className={['wj-icon-text-block', props.className].join(' ')}>
            <div className='wj-icon-text-block-inner'> 
                <div className='wj-icon-text-block-icon'> 
                    <img src={imgUrl} alt="icon" 
                        style={{
                            maxWidth: `${widthImage}px`,
                        }} 
                    />
                </div>
                <div className='wj-icon-text-block-content'> 
                    <div className='wj-icon-text-block-content__inner'>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>  
        </div>
	)
}

export default Save;