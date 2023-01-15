/**
 * BLOCK: Slider
 */
import './styles/style.scss'
import './styles/editor.scss'
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Fragment } from '@wordpress/element'
import { ToggleControl, PanelBody, RangeControl } from '@wordpress/components';
import { InnerBlocks, InspectorControls,  } from '@wordpress/block-editor'
import './components/carousel-item'
const ALLOWED_CHILDREN_BLOCKS = ['antero-blocks/carousel-item']

export default registerBlockType('antero-blocks/hero-carousel', {
    title: __('Hompage Hero Carousel'),
    icon: 'slides',
    category: 'antero-blocks',
    keywords: [
        'homepage',
        'slider',
        'hero',
        'carousel'
    ],
    attributes: {
        arrows: {
            type: 'boolean',
            default: false
        },
        dots: {
            type: 'boolean',
            default: true
        },
        infinite: {
            type: 'boolean',
            default: true
        },
        speed: {
            type: 'number',
            default: 700
        },
        autoplay: {
            type: 'boolean',
            default: true
        },
        autoplaySpeed: {
            type: 'number',
            default: 3000
        },
    },
    edit: ({ attributes, setAttributes, className }) => {
        const { arrows, dots, infinite, speed, autoplay, autoplaySpeed } = attributes
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Carousel Settings')}>
                        <ToggleControl
                            label="Arrows"
                            checked={arrows}
                            onChange={() => setAttributes({ arrows: !arrows })}
                        />
                        <ToggleControl
                            label="Dots"
                            checked={dots}
                            onChange={() => setAttributes({ dots: !dots })}
                        />
                        <ToggleControl
                            label="Infinite"
                            checked={infinite}
                            onChange={() => setAttributes({ infinite: !infinite })}
                        />
                        <ToggleControl
                            label="Autoplay"
                            checked={autoplay}
                            onChange={() => setAttributes({ autoplay: !autoplay })}
                        />
                        <RangeControl
                            label='Speed'
                            value={speed}
                            onChange={(vl) => setAttributes({ speed: vl })}
                            min={100}
                            max={1000}
                            step={100}
                        />
                        <RangeControl
                            label='Autoplay Speed'
                            value={autoplaySpeed}
                            onChange={(vl) => setAttributes({ autoplaySpeed: vl })}
                            min={100}
                            max={5000}
                            step={100}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={['antero-hero-carousel-block', className].join(' ')} >
                    <div className="antero-hero-carousel-block-inner">
                        <InnerBlocks
                            template={[ALLOWED_CHILDREN_BLOCKS]}
                            allowedBlocks={ALLOWED_CHILDREN_BLOCKS}
                            renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
                        />
                    </div>

                </div>
            </Fragment>
        )
    },
    save: ({ attributes, className, clientId }) => {
        const { arrows, dots, infinite, speed, autoplay, autoplaySpeed } = attributes
        const data_slider = {
            arrows: arrows,
            dots: dots,
            infinite: infinite,
            speed: speed,
            autoplay: autoplay,
            autoplaySpeed: autoplaySpeed,
        }
        return (
            <div className={['antero-hero-carousel-block', className].join(' ')} data-carousel-homepage={JSON.stringify(data_slider)}>
                <div className="antero-hero-carousel-block-inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        )
    }
})
