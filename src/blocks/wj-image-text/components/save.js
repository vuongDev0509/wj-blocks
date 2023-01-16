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
                        style={{
                            color: colorHeading,
                            maxWidth: `${widthHeading}%`,
                        }}
                    > {heading} </h2>
                    <div className='wj-images-text-block-content__inner'>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>  
        </div>
	)
}

export default Save;