/**
 * BLOCK: Video
 */

import './styles/style.scss'
import './styles/editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'


import Save from './components/save';
import Edit from './components/edit'

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 22 22">
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
	</svg>
);

const blockAttrs = {
	videoURL: {
		type: 'string',
	},
	videoID: {
		type: 'string',
	},
	videoSourceType: {
		type: 'string',
	},
	videoTitle: {
		type: 'string',
	},
	videoFullWidth: {
		type: 'boolean',
		default: true,
	},
	videoWidth: {
		type: 'number',
	},
	videoHeight: {
		type: 'number',
		default: 450,
	},
	poster: {
		type: 'string',
	},
	posterID: {
		type: 'number',
	},
	openInLightbox: {
		type: 'boolean',
		default: true,
	},
	changed: {
		type: 'boolean',
		default: false,
	},
	autoPlay: {
		type: 'boolean',
		default: false
	},
	loop: {
		type: 'boolean',
		default: false
	},
	muted: {
		type: 'boolean',
		default: false
	},
	playback: {
		type: 'boolean',
		default: true
	},
	playsinline: {
		type: 'boolean',
		default: true
	},
	preload: {
		type: 'string',
		default: 'metadata'
	},
};

registerBlockType('antero-blocks/antero-video-block', {
	title: 'Advanced Video - AD Block',
	description: 'Powerful block for insert and embed video.',
	icon: {
		src: BlockIcon,
	},
	category: 'antero-blocks',
	keywords: ['video', 'embed', 'media'],
	attributes: blockAttrs,
	supports: {
		anchor: true
	},
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});