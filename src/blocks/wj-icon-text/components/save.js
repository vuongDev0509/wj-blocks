import { InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
	const { attributes, className } = props;
	const { imgUrl, widthImage, animate, link } = attributes;
    
    return (
        <div className={['wj-icon-text-block', props.className].join(' ')}>
            <div className='wj-icon-text-block-inner'> 
                <a href={link}> 
                <div className='wj-icon-text-block-icon'> 
                    { animate ?
                        <img src={imgUrl} alt="icon" 
                            style={{
                                maxWidth: `${widthImage}px`,
                            }} 
                            data-aos-duration="1200" 
                            data-aos="fade-in" 
                            data-aos-once="false" 
                            data-aos-delay="500"
                        />
                    :
                    <img src={imgUrl} alt="icon" 
                        style={{
                            maxWidth: `${widthImage}px`,
                        }} 
                     />
                    }
                </div>
                <div className='wj-icon-text-block-content'> 
                    <div className='wj-icon-text-block-content__inner'>
                        <InnerBlocks.Content />
                    </div>
                </div>
                </a>
            </div>  
        </div>
	)
}

export default Save;