import { InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
	const { attributes, className } = props;
	const { imgUrl, widthImage, animate, link } = attributes;
    
    return (
        <div className={['wj-icon-text-block', props.className].join(' ')}>
            { animate ? 
                <div className='wj-icon-text-block-inner'
                    data-aos-duration="1200" 
                    data-aos="fade-in" 
                    data-aos-once="false" 
                    data-aos-delay="500"
                > 
                    <a href={link}> 
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
                    </a>
                </div>
            : 
            <div className='wj-icon-text-block-inner'> 
                <a href={link}> 
                    <div className='wj-icon-text-block-icon'> 
                        <img src={imgUrl} alt="icon" 
                            width="100"
                            height="100"
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
                </a>
            </div>                                
            } 
        </div>
	)
}

export default Save;