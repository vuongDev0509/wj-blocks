//  Import CSS.
import './styles/editor.scss';
import './styles/style.scss';

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import Save from './components/save';
import Edit from './components/edit';

const BlockIcon = (
	<svg height="20" viewBox="2 2 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

const BlockAttrs = {
	column: {
		type: 'boolean',
		default: false,
	},
	txtColor: {
		type: 'string',
		default: '#00293C',
	},
	spaceItem: {
		type: 'number',
		default: 17,
	},
	values: {
		type: 'array',
		source: 'children',
		selector: 'ul',
		default: [],
	}
};

registerBlockType('antero-blocks/antero-list-bullet-block', {
	title: 'Bullet Lists - antero Block',
	description: 'List block with custom icons and styles.',
	icon: {
		src: BlockIcon,
	},
	category: 'antero-blocks',
	keywords: ['list', 'icon', 'bullet'],
	attributes: BlockAttrs,
	styles: [
		{ name: 'bullets', label: 'Bullets', isDefault: true },
		{ name: 'ticks', label: 'Ticks' },
		{ name: 'numbered', label: 'Numbered' },
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
