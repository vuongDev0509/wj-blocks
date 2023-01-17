
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import Edit from "./components/edit";
import Save from "./components/save";


registerBlockType('wj-blocks/wj-info-text', {
    title: __('Info Text - WJ Blocks'),
    category: 'wj-blocks',
    keywords: [__('info'), __('button'), __('text')],
    info: 'block-default',
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
            default: cgbGlobal.defaultinfo,
        },
        srcset_image: {
            type: "string",
        },        
        heading: {
            type: 'string',
            default: 'Bar'
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