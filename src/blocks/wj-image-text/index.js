
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import Edit from "./components/edit";
import Save from "./components/save";


registerBlockType('wj-blocks/wj-images-text', {
    title: __('Images Text - WJ Blocks'),
    category: 'wj-blocks',
    keywords: [__('image'), __('button'), __('text')],
    icon: 'block-default',
    attributes: {
        widthHeading: {
            type: 'number',
            default: 70
        },
        imgID: {
            type: "number",
            default: 0,
        },
        imgUrl: {
            type: "string",
            default: 'https://picsum.photos/1200/900?1',
        },
        srcset_image: {
            type: "string",
        },        
        heading: {
            type: 'string',
            default: 'Heading Here'
        },
        colorHeading: {
            type: 'string',
            default: '#e1dfda'
        },
        bgColor: {
            type: 'string',
            default:'#836d5f'
        },
    },

	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
})