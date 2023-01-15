import { __ } from '@wordpress/i18n'
import { Fragment, useState } from '@wordpress/element'
import { BlockControls, RichText, InnerBlocks } from '@wordpress/block-editor'
import { ToggleControl, Toolbar, ToolbarButton} from '@wordpress/components'

const Edit = (props) => {
    const [preview, setPreview] = useState(true)
	const { attributes, className, setAttributes  } = props;
    let { heading, open} = attributes;
    const TEMPLATE = [
        ['core/paragraph', { content: 'Lorem ipsum dolor sit amet id erat aliquet diam ullamcorper tempus massa eleifend vivamus.' }]
    ]
	return (
        <Fragment>
            <BlockControls>
                <Toolbar>
                <ToolbarButton
                        icon={!preview ?
                            <span className="dashicons dashicons-visibility" /> :
                            <span className="dashicons dashicons-edit" />}
                            label={!preview ? __('Preview') : __('Edit')}
                            onClick={(e) => setPreview(!preview)
                        }
                    />
                </Toolbar>
            </BlockControls>

            <div className={['block-antero-accordion', 'block-editor', props.className].join(' ')} >
                {!preview ? 
                    <div className="inner-wrap">
                        <div className={'qa-item ' + (open ? 'qa-item-open' : '')}>
                            <div className="qa-question">
                                <RichText
                                tagName="div"
                                value={heading}
                                placeholder="Question..."
                                onChange={(value) => setAttributes({ heading: value })}
                                />
                                <span className='qa-item-icon'></span>
                            </div>

                            <hr />
                            <div className="qa-answer">
                                <InnerBlocks template={TEMPLATE} />
                            </div>

                            <hr />
                            <div>
                                <span className="qa-open">
                                    <ToggleControl
                                        label="Open default"
                                        checked={open}
                                        onChange={() => setAttributes({ open: !open })}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                : 
                    <div className="inner-wrap">
                        <div className={'qa-item ' + (open ? 'qa-item-open' : '')}>
                            <div className="qa-question">
                                <RichText.Content value={heading} tagName="h3" />
                                <span className='qa-item-icon'></span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Fragment>
	)
}

export default Edit;