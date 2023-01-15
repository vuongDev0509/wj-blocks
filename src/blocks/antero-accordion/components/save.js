import { RichText, InnerBlocks } from '@wordpress/block-editor'
const Save = (props) => {
	const { attributes, className } = props;
	let { heading, open } = attributes;
	return (
        <div className={['block-antero-accordion', props.className].join(' ')} >
            <div className="inner-wrap">
                <div
                    className={'qa-item ' + (open ? 'qa-item-open' : '')}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="0"
                    data-aos-easing="ease-in-out"
                >
                    <div className="qa-question">
                        <RichText.Content value={heading} tagName="h3" />
                        <span className='qa-item-icon'></span>
                    </div>

                    <div className="qa-answer">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </div>
	)
}

export default Save;