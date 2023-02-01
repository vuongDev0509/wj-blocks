<?php

/**
 * Blocks Initializer
 *
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Adds the wj Blocks block category.
 *
 * @param array $categories Array of categories for block types.
 * @return array Updated block categories.
 */
function wj_blocks_category($categories)
{
	return array_merge(
		array(
			array(
				'slug'  => 'wj-blocks',
				'title' => 'wj Blocks',
			),
		),
		$categories
	);
}

add_filter('block_categories_all', 'wj_blocks_category', 10, 2 );


function wj_colour_palette_default() {
	add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => 'Primary Colour',
			'slug'  => 'primary-colour',
			'color' => '#161624',
		),
		array(
			'name'  => 'Secondary Colour',
			'slug'  => 'secondary-colour',
			'color' => '#56B8FF',
		),
		array(
			'name'  => 'White Colour',
			'slug'  => 'white-colour',
			'color' => '#FFF',
		),
		array(
			'name'  => 'Black Colour',
			'slug'  => 'black-colour',
			'color' => '#000',
		),
	) );
}

add_action( 'after_setup_theme', 'wj_colour_palette_default' );


function wj_require_render_block()
{
	foreach (glob(__DIR__ . '/blocks/*.php') as $file) {
		require $file;
	}
}
add_action('init', 'wj_require_render_block');