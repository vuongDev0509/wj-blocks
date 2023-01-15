//  Import CSS.
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

import Edit from "./components/edit";
import Save from "./components/save";

const attr = {
	heading: {
		type: 'string',
		default: 'Heading here...'
	},
	open: {
		type: 'boolean',
		default: false
	},
	anchor: {
		type: 'string'
	},
};



registerBlockType('antero-blocks/antero-list-core-values', {
	title: __('List Core Values - Antero Blocks'),
	category: 'antero-blocks',
	keywords: [__('list'), __('core'), __('values'), __('timeline')],
	icon: 'shield',
	attributes: attr,
	supports: {
		'anchor': true,
	},
	styles: [
		{ name: 'layout-1', label: 'Style 1', isDefault: true },
		{ name: 'layout-2',  label: 'Style 2' }
	],
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},
	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});
