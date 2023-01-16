/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { createHigherOrderComponent, withState } = wp.compose;
const { ToggleControl, SelectControl, PanelBody, PanelRow, RangeControl } = wp.components;

const optionAnimation = [
    {
        label: 'Fade Up',
        value: 'fade-up'
    },
    {
        label: 'Fade Down',
        value: 'fade-down'
    },
    {
        label: 'Fade Right',
        value: 'fade-right'
    },
    {
        label: 'Fade Left',
        value: 'fade-left'
    },
    {
        label: 'Fade Up Right',
        value: 'fade-up-right'
    },
    {
        label: 'Fade Up Left',
        value: 'fade-up-left'
    },
    {
        label: 'Fade Down Left',
        value: 'fade-down-left'
    },
    {
        label: 'Fade Down Right',
        value: 'fade-down-right'
    },
    {
        label: 'Flip Left',
        value: 'flip-left'
    },
    {
        label: 'Flip Right',
        value: 'flip-right'
    },
    {
        label: 'Flip Up',
        value: 'flip-up'
    },
    {
        label: 'Flip Down',
        value: 'flip-down'
    },
    {
        label: 'Zoom In',
        value: 'zoom-in'
    },
    {
        label: 'Zoom In Up',
        value: 'zoom-in-up'
    },
    {
        label: 'Zoom In Down',
        value: 'zoom-in-down'
    },
    {
        label: 'Zoom In Left',
        value: 'zoom-in-left'
    },
    {
        label: 'Zoom In Right',
        value: 'zoom-in-right'
    },
    {
        label: 'Zoom Out',
        value: 'zoom-out'
    },
    {
        label: 'Zoom Out Up',
        value: 'zoom-out-up'
    },
    {
        label: 'Zoom Out Down',
        value: 'zoom-out-down'
    },
    {
        label: 'Zoom Out Right',
        value: 'zoom-out-right'
    },
    {
        label: 'Zoom Out Left',
        value: 'zoom-out-left'
    }
];


function gutenbergAOSAttributes(settings, name) {

    //check if object exists for old Gutenberg version compatibility
    if (name.substring(0, 5) !== 'core/') return settings;

    settings.attributes = Object.assign(settings.attributes, {
        gutenbergUseAOS: {
            type: 'boolean',
            default: false,
        },
        gutenbergAOSAnimation: {
            type: 'select',
            default: 'fade-up'
        },
        gutenbergAOSDuration: {
            type: 'number',
            default: 1200
        }
    });

    return settings;
}


addFilter(
    'blocks.registerBlockType',
    'gutenbergaos/attributes',
    gutenbergAOSAttributes
);


const gutenbergAOSControls = createHigherOrderComponent((BlockEdit) => {

    return (props) => {

        if (props.name.substring(0, 5) !== 'core/') {
            return (
                <Fragment>
                    <BlockEdit {...props} />
                </Fragment>
            );
        }

        const { attributes, setAttributes, isSelected, } = props;
        const { gutenbergUseAOS, gutenbergAOSAnimation, gutenbergAOSDuration } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected &&
                    <InspectorControls>
                        <PanelBody title={__('AOS Settings', 'wj-blocks')} >
                            <PanelRow>
                                <ToggleControl
                                    label={__('Animate on scroll', 'wj-blocks')}
                                    checked={!!gutenbergUseAOS}
                                    onChange={() => setAttributes({ gutenbergUseAOS: !gutenbergUseAOS })}
                                    help={!!gutenbergUseAOS ? __('Animate Element when it\'s inside the users viewport', 'wj-blocks') : __('Don\'t animate Element when it\'s inside the users viewport', 'wj-blocks')}
                                />
                            </PanelRow>
                            {!!gutenbergUseAOS && (
                                <Fragment>
                                    <PanelRow>
                                        <SelectControl
                                            label="Animation"
                                            value={gutenbergAOSAnimation}
                                            options={optionAnimation}
                                            onChange={(gutenbergAOSAnimation) => props.setAttributes({ gutenbergAOSAnimation: gutenbergAOSAnimation })}
                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RangeControl
                                            label="Duration"
                                            allowReset={true}
                                            step={10}
                                            value={gutenbergAOSDuration}
                                            onChange={(gutenbergAOSDuration) => props.setAttributes({ gutenbergAOSDuration: gutenbergAOSDuration })}
                                            min={0}
                                            max={5000}
                                        />
                                    </PanelRow>
                                </Fragment>
                            )}
                        </PanelBody>
                    </InspectorControls>
                }
            </Fragment>
        );
    };
}, 'gutenbergAOSControls');


addFilter(
    'editor.BlockEdit',
    'gutenbergaos/controls',
    gutenbergAOSControls
);


function gutenbergAOSApplyAttributes(extraProps, blockType, attributes) {

    if (blockType.name.substring(0, 5) !== 'core/') {
        return extraProps;
    }

    const { gutenbergUseAOS, gutenbergAOSAnimation, gutenbergAOSDuration } = attributes;

    //check if attribute exists for old Gutenberg version compatibility
    if (typeof gutenbergUseAOS !== 'undefined' && gutenbergUseAOS) {

        let animationName;
        if (typeof gutenbergAOSAnimation !== 'undefined' && gutenbergAOSAnimation) {
            animationName = gutenbergAOSAnimation;
        } else {
            animationName = 'fade-up';
        }

        extraProps['data-aos'] = animationName;
        extraProps['data-aos-duration'] = gutenbergAOSDuration;

    }

    return extraProps;

}

addFilter(
    'blocks.getSaveContent.extraProps',
    'gutenbergaos/applyAttributes',
    gutenbergAOSApplyAttributes
);