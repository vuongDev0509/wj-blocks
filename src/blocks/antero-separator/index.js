//import style
import './styles/style.scss'
import './styles/editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'


import Edit from './components/edit'
import Save from './components/save'

const blockIcon = (<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path></svg>);

const BlockAttrs = {
	fullwidth: {
		type: 'boolean',
		default: false
	},
	colorBg: {
		type: "string",
	},
	widthSep: {
		type: "number",
		default: 63,
	},
	heightSep: {
		type: "number",
		default: 2,
	},
	alignBlock: {
		type: "string",
		default: 'left',
	},
};



export default registerBlockType('antero-block/antero-separator-block', {
	title: __('Separator - antero Blocks'),
	description: __('Create a break between ideas or sections with a horizontal separator.'),
	icon: blockIcon,
	category: 'antero-blocks',
	keywords: [__('separator'), __('antero'), __('break')],
	attributes: BlockAttrs,
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
})