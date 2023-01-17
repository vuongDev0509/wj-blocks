import { InnerBlocks } from '@wordpress/block-editor';

const Save = (props) => {
	const { attributes, className } = props;
	const {heading, imgUrl, colorHeading, bgColor, widthHeading } = attributes;
    
    return (
        <div className={['wj-images-text-block', props.className].join(' ')}>
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
                        data-aos="fade-up" data-aos-duration="1200" data-aos-once="false"
                        style={{
                            color: colorHeading,
                            maxWidth: `${widthHeading}%`,
                        }}
                    > {heading} </h2>
                    <div className='wj-images-text-block-content__inner'
                        data-aos-duration="1200"
                        data-aos="fade-in" data-aos-once="false" data-aos-delay="500"
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>  
        </div>
	)
}

export default Save;