const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { assign, merge } = lodash;
const { Fragment } = wp.element;
import './style.scss'
import {
    useBlockProps,
    BlockEdit,
    InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n'
import { PanelBody, SelectControl } from '@wordpress/components';
import classnames from 'classnames';

function addAttributes(settings, name) {
    if (name === 'core/group') {
        return assign({}, settings, {
            attributes: merge(settings.attributes, {
                size: {
                    type: 'string',
                    default: '',
                },
            }),
        });
    }
    return settings;
}

addFilter(
    'blocks.registerBlockType',
    'wj/group-block/add-attributes',
    addAttributes,
);

const addInspectorControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const {
            attributes: { size },
            setAttributes,
            name,
        } = props;
        if (name !== 'core/group') {
            return <BlockEdit {...props} />;
        }
        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__('Gap settings', 'wj')}
                    >
                        <SelectControl
                            label={__('Gap', 'wj')}
                            value={size}
                            options={[
                                {
                                    label: __('Default', 'wj'),
                                    value: 'default',
                                },
                                {
                                    label: __('Small', 'wj'),
                                    value: 'small'
                                },
                                {
                                    label: __('Regular', 'wj'),
                                    value: 'regular',
                                },
                                {
                                    label: __('Large', 'wj'),
                                    value: 'large'
                                },
                            ]}
                            onChange={(value) => {
                                setAttributes({ size: value });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControl');

addFilter(
    'editor.BlockEdit',
    'wj/group-block/add-inspector-controls',
    addInspectorControl,
);

const addSizeClass = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const {
            attributes: { size },
            className,
            name,
        } = props;

        if (name !== 'core/group') {
            return <BlockListBlock {...props} />;
        }

        return (
            <BlockListBlock
                {...props}
                className={classnames(className, size ? `has-size-${size}` : '')}
            />
        );
    };
}, 'withClientIdClassName');

addFilter(
    'editor.BlockListBlock',
    'wj/group-block/add-editor-class',
    addSizeClass
);

function addSizeClassFrontEnd(props, block, attributes) {
    if (block.name !== 'core/group') {
        return props;
    }

    const { className } = props;
    const { size } = attributes;

    return assign({}, props, {
        className: classnames(className, size ? `has-size-${size}` : ''),
    });
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'wj/button-block/add-front-end-class',
    addSizeClassFrontEnd,
);