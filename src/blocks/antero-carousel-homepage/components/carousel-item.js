/**
 * BLOCK: Slide Item
 */

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import Edit from './edit'
import Save from './save'
import { withSelect } from '@wordpress/data'

const attrBlock = {
    imgID: {
        type: 'number',
    },
    imgUrl: {
        type: 'string',
        default: 'https://picsum.photos/1200/900?1'
    },
    focalPoint: {
        type: 'object',
    },
    containerWidth: {
        type: 'number',
        default: 432
    },
    bgGradientColor: {
        type: "string",
    },
    bgColor: {
        type: "string",
    },
    srcSet: {
        type: "string",
    },
    containerPaddingTop: {
        type: 'Object',
        default: {
            default: '25vh',
            tablet: '20vh',
            sync: true,
        }
    },
    containerPaddingBottom: {
        type: 'Object',
        default: {
            default: '25vh',
            tablet: '20vh',
            sync: true,
        }
    },
}

export default registerBlockType('antero-blocks/carousel-item', {
    title: __('Carousel Item'),
    icon: 'block-default',
    category: 'antero-blocks',
    parent: ['antero-blocks/hero-carousel'],
    attributes: attrBlock,
    /* Render the block in the editor. */
    edit: withSelect((select, props) => {
		const { getMedia } = select('core');
		const { imgID } = props.attributes;

		return {
			mediaBG: imgID ? getMedia(imgID) : null,
		};
	})(Edit),
    /* Save the block markup. */
    save: (props) => {
        return <Save {...props} />;
    },
})