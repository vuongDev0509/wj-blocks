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
	imgID: {
		type: "number",
		default: 0,
	},
	imgUrl: {
		type: "string",
		default: "https://picsum.photos/1200/900?1",
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
};

export default registerBlockType("wj-blocks/hero", {
	title: __("Hero Section"),
	icon: "shield",
	category: "wj-blocks",
	keywords: [__("text"), __("image"), __("hero"), __("section")],
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
