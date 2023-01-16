/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */

// Setup the block
const { __ } = wp.i18n;
import {
    InspectorControls,
    MediaUpload,
	MediaUploadCheck,
    BlockControls,
    PanelColorSettings,
} from '@wordpress/block-editor'    

import {
    PanelBody,
    ToggleControl,
    Button,
    TextControl,
    RangeControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components'

const ALLOWED_MEDIA_TYPES = ['image']
const instructions = (
	<p>To edit the image, you need permission to upload media.</p>
);


const Inspector = (props) => {
	const { attributes, setAttributes, preview } = props;
    const {imgID, imgUrl, widthImage} = attributes;
    	
	return (
        <InspectorControls>
            <PanelBody title={__('General')}>
                <div className="components-placeholder__fieldset">
                    <label 
                        style={(() => {
                            return {
                                marginBottom: '10px',
                            }
                        })()} 
                    >
                        Image
                    </label>
					<MediaUploadCheck fallback={instructions}>
						<MediaUpload
							title="Main Image"
							onSelect={(media) => {
								setAttributes({
									imgID: parseInt(media.id),
									imgUrl: media.url,
                                    srcset_image: media.sizes.full.srcset
								});
							}}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={imgID}
							render={({ open }) => (
								<Button
									className={
										!imgID
											? "editor-post-featured-image__toggle"
											: "editor-post-featured-image__preview"
									}
									onClick={open}
								>
									{!imgID && "Change Image"}
									{!!imgID && <img src={imgUrl} alt="img" />}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					{!!imgID && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({
										imgID: parseInt(media.id),
										imgUrl: media.url,
									});
								}}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imgID}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{"Replace Image"}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					)}

					{!!imgID && (
						<MediaUploadCheck>
							<Button
								onClick={() => {
									setAttributes({ imgID: 0, imgUrl: "" });
								}}
								isDestructive
							>
								{"Remove Image"}
							</Button>
						</MediaUploadCheck>
					)}
				</div>
   
                <hr/>
                <RangeControl
                    label="Max Width Image"
                    min={1}
                    max={100}
                    value={widthImage}
                    onChange={(widthImage) => setAttributes({ widthImage })}
                />
            </PanelBody>
        </InspectorControls>
	);
}

export default Inspector