const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { assign, merge } = lodash;
const { Fragment } = wp.element;
import './style.scss'
import {
    InspectorControls
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n'
import { 
    PanelBody, 
    FocalPointPicker,
    __experimentalBoxControl as BoxControl
 } from '@wordpress/components';
import classnames from 'classnames';

function addAttributes(settings, name) {
    if (name === 'core/media-text') {
        return assign({}, settings, {
            attributes: merge(settings.attributes, {
                focalPoint: {
                    type: "object",
                    default: { x: 0.5, y: 0.5 }
                },
                paddingContent: {
                    type: "string",
                    default: {
                        top: '',
                        left: '',
                        right: '',
                        bottom: '',
                    }
                }
            }),
        });
    }
    return settings;
}

addFilter(
    'blocks.registerBlockType',
    'wj/media-text-block/add-attributes',
    addAttributes,
);

const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes: { focalPoint, mediaUrl, paddingContent }, setAttributes, name, } = props;
        if (name !== 'core/media-text') {
            return <BlockEdit {...props} />;
        }

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody>
                        <BoxControl
                            label="Padding"
                            values={paddingContent}
                            onChange={(value) => setAttributes({ paddingContent: value })}
                        />
                        <FocalPointPicker
                            label='Focal Point Picker'
                            url={mediaUrl}
                            value={focalPoint}
                            onChange={(value) => setAttributes({ focalPoint: value })}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControl');

addFilter(
    'editor.BlockEdit',
    'wj/media-text-block/add-inspector-controls',
    addInspectorControl,
);

const mediaTextEditor = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const {
            attributes: { focalPoint, paddingContent },
            className,
            name,
        } = props;

        if (name !== 'core/media-text') {
            return <BlockListBlock {...props} />;
        }
        
        let {top, right, bottom, left} = paddingContent

        return (
            <Fragment>
                <style>
                    {`#block-${props.clientId} .wp-block-media-text__media img, #block-${props.clientId} .wp-block-media-text__media video { 
                        object-position: ${focalPoint ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%` : undefined}
                    }
                    #block-${props.clientId} .wp-block-media-text .wp-block-media-text__content{
                        padding: ${top} ${right} ${bottom} ${left}
                    }
                    `
                    }
                </style>
                <BlockListBlock
                    {...props}
                />
            </Fragment>
        );
    };
}, 'withClientIdClassName');

addFilter(
    'editor.BlockListBlock',
    'wj/media-text-block/add-editor',
    mediaTextEditor
);