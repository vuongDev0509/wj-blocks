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
    const {heading} = attributes;
    	
	return (
        <InspectorControls>
            <PanelBody title={__('General')}>
                <TextControl
                    label="Heading"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                /> 
            </PanelBody>
        </InspectorControls>
	);
}

export default Inspector