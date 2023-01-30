import { __ } from '@wordpress/i18n'
import { InspectorControls, MediaUploadCheck, MediaUpload} from '@wordpress/block-editor'
import {
	ToggleControl,
	PanelBody,Button,TextControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components'

const Inspector = (props) => {
    const { attributes, className, setAttributes  } = props;
    const { slidesToShow, slidesToScroll, arrows, dots,  autoplay, infinite, imgID, imgUrl, spaceBetween, heightItem} = attributes;
    const instructions = <p>{__('To edit the image, you need permission to upload media.')}</p>;

    return (
        <InspectorControls>
            <PanelBody title="Images" initialOpen={true}>
                <div className="components-placeholder__fieldset">
                    <MediaUploadCheck fallback={instructions}>
                        <MediaUpload
                            title={__('Image')}
                            onSelect={(media) => {
                                let ids = media.map(e => e.id);
                                let urls = media.map(e => e.url);
                                setAttributes({
                                    imgID: ids,
                                    imgUrl: urls,
                                })
                            }}
                            multiple={true}
                            gallery={true}
                            allowedTypes={['image']}
                            value={imgID}
                            render={({open}) => (
                                <Button
                                    className={!imgID ? 'wj-image-editor editor-post-featured-image__toggle' : 'wj-gallery-sidebar editor-post-featured-image__preview'}
                                    onClick={open}>
                                    {
                                        imgUrl.map((e, i) =>
                                            <div key={'img-' + i} className="img-item"><img src={e} alt="img" /></div>)
                                    }
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {!!imgID &&
                    <MediaUploadCheck>
                        <MediaUpload
                            title={__('Image')}
                            onSelect={(media) => {
                                let ids = media.map(e => e.id);
                                let urls = media.map(e => e.url);
                                setAttributes({
                                    imgID: ids,
                                    imgUrl: urls,
                                })
                            }}
                            multiple={true}
                            gallery={true}
                            allowedTypes={['image']}
                            value={imgID}
                            render={({open}) => (
                                <Button onClick={open} isSecondary>
                                    {__('Replace Image')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    }
                    {!!imgID &&
                    <MediaUploadCheck>
                        <Button onClick={() => (
                            setAttributes({
                                imgID: [],
                                imgUrl: [],
                            })
                        )} isDestructive>
                            {__('Remove Image')}
                        </Button>
                    </MediaUploadCheck>
                    }
                </div>
            </PanelBody>


            <PanelBody title={__('Slider Setting')}>
                <label>Number slide to show</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(slidesToShow) => {
                        setAttributes({ slidesToShow })
                    }}
                    shiftStep={10} value={slidesToShow}
                />
                
                <hr />
                <label>Number slides to scroll</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(slidesToScroll) => {
                        setAttributes({ slidesToScroll })
                    }}
                    shiftStep={10} value={slidesToScroll}
                />

                <hr />
                <label>Space Between</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(spaceBetween) => {
                        setAttributes({ spaceBetween })
                    }}
                    shiftStep={5} value={spaceBetween}
                />

                <hr/>
                <TextControl
                    label="Height Item"
                    value={heightItem}
                    onChange={(value) => setAttributes({ heightItem: value })}
                /> 

                <hr />
                <ToggleControl
                    label="Arrows"
                    help={arrows ? 'Enable arrows.' : 'Disable arrows.'}
                    checked={arrows}
                    onChange={() => {
                        setAttributes({ arrows: !arrows })
                    }}
                />

                <hr />
                <ToggleControl
                    label="Dots"
                    help={dots ? 'Enable dots.' : 'Disable dots.'}
                    checked={dots}
                    onChange={() => {
                        setAttributes({ dots: !dots })
                    }}
                />
                
                <hr />
                <ToggleControl
                    label="Autoplay"
                    help={autoplay ? 'Enable autoplay.' : 'Disable autoplay.'}
                    checked={autoplay}
                    onChange={() => {
                        setAttributes({ autoplay: !autoplay })
                    }}
                />

                <hr />
                <ToggleControl
                    label="Loop"
                    help={infinite ? 'Enable fade.' : 'Disable fade.'}
                    checked={infinite}
                    onChange={() => {
                        setAttributes({ infinite: !infinite })
                    }}
                />
            </PanelBody>
        </InspectorControls>
    )
}

export default Inspector