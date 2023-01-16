/**
 * Import global styles.
 */

//add style global
import './styles/style.scss';
import './styles/editor.scss';

//add style button
import './core-button/style.scss';

//add style group
import './core-group'

//add style media text
import './core-media-text'

//add style image
import './core-image'

//add AOS Animation
import './aos'

wp.domReady(() => {

	//core/button
	wp.blocks.unregisterBlockStyle('core/button', 'default');
	wp.blocks.unregisterBlockStyle('core/button', 'fill');
	wp.blocks.unregisterBlockStyle('core/button', 'outline');

	wp.blocks.unregisterBlockStyle('core/image', 'default');
	wp.blocks.unregisterBlockStyle('core/image', 'rounded');

	wp.blocks.registerBlockStyle("core/button", {
		name: "wj-default",
		label: "Default",
		isDefault: true,
	});

	wp.blocks.registerBlockStyle("core/button", {
		name: "fill",
		label: "Fill",
	});

	wp.blocks.registerBlockStyle("core/button", {
		name: "outline",
		label: "Outline",
	});

	wp.blocks.registerBlockStyle("core/image", {
		name: "wj-default",
		label: "Default",
		isDefault: true,
	});

	wp.blocks.registerBlockStyle("core/image", {
		name: "rounded",
		label: "Rounded",
		isDefault: true,
	});

	wp.blocks.registerBlockStyle("core/image", {
		name: "light",
		label: "Light",
		isDefault: true,
	});

});




