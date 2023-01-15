/**
 * Import global styles.
 */
import './styles/style.scss';
import './styles/editor.scss';
import './core-button/style.scss';
import './core-image/style.scss';

wp.domReady( () => {

    //core/button
    wp.blocks.unregisterBlockStyle('core/button', 'default');
	wp.blocks.unregisterBlockStyle('core/button', 'fill');
	wp.blocks.unregisterBlockStyle('core/button', 'outline');

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

});




