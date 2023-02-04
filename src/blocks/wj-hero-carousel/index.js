/**
 * BLOCK: Hero Section
 */

import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const attr = {
	galleryID: {
		type: 'array',
		default: []
	},
	galleryUrl: {
		type: 'array',
		default: []
	},
	bgColor: {
		type: "string",
	},
	srcSet: {
        type: "string",
    },
	focalPoint: {
		type: "object",
		default: { x: 0.5, y: 0.5 },
	},
	blockPaddingTop: {
		type: 'Object',
		default: {
			default: '185px',
			tablet: '100px',
			mobile: '40px',
			sync: true,
		}
	},
	blockPaddingBottom: {
		type: 'Object',
		default: {
			default: '185px',
			tablet: '100px',
			mobile: '40px',
			sync: true,
		}
	},
	id: {
		type: 'string',
	},
	//slider opt
	slidesToShow: {
		type: 'number',
		default: 1
	},
	slidesToScroll: {
		type: 'number',
		default: 1
	},
	spaceBetween: {
		type: 'number',
		default: 0
	},
	speed: {
		type: 'number',
		default: 2000
	},
	arrows: {
		type: 'boolean',
		default: false
	},
	dots: {
		type: 'boolean',
		default: false
	},
	autoplay: {
		type: 'boolean',
		default: true
	},
	infinite: {
		type: 'boolean',
		default: true
	}
};

export default registerBlockType("wj-blocks/hero-carousel", {
	title: __("Hero Carousel Section"),
	icon: "shield",
	category: "wj-blocks",
	keywords: [__("carousel"), __("image"), __("hero"), __("section")],
	attributes: attr,
	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},
	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});
