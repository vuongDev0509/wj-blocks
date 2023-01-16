
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import Edit from "./components/edit";
import Save from "./components/save";


registerBlockType('wj-blocks/wj-icon-text', {
    title: __('Icon Text - WJ Blocks'),
    category: 'wj-blocks',
    keywords: [__('icon'), __('button'), __('text')],
    icon: 'block-default',
    attributes: {
        widthImage: {
            type: 'number',
            default: 70
        },
        imgID: {
            type: "number",
            default: 0,
        },
        imgUrl: {
            type: "string",
            default: cgbGlobal.defaultIcon,
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