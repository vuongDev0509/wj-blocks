/**
 * BLOCK: TM Slider Block
 */

import './styles/editor.scss'
import './styles/style.scss'
// import './slide-item'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

import Save from "./components/save";
import Edit from "./components/edit";

const attr = {
	imgID: {
		type: 'array',
		default: []
	},
	imgUrl: {
		type: 'array',
		default: []
	},
	
	align: {
		type: 'string',
		default: ''
	},

	//slider opt
	slidesToShow: {
		type: 'number',
		default: 4
	},
	slidesToScroll: {
		type: 'number',
		default: 1
	},
	heightItem: {
		type: 'string',
		default: '40vh'
	},
	spaceBetween: {
		type: 'number',
		default: 30
	},
	arrows: {
		type: 'boolean',
		default: true
	},
	dots: {
		type: 'boolean',
		default: false
	},
	autoplay: {
		type: 'boolean',
		default: false
	},
	infinite: {
		type: 'boolean',
		default: true
	}
};

export default registerBlockType('wj-blocks/wj-images-sliders', {
	title: __('Images Sliders - Wj Blocks'),
	category: 'wj-blocks',
    keywords: [__('carousel'), __('images'), __('sliders')],
	icon: 'slides',
	supports: {
		align: ['full']
	},
	attributes: attr,

	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},
	save: (props) => {
		return <Save {...props} />;
	}
})
