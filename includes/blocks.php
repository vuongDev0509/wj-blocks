<?php
if (!function_exists('wj_init_register_block')) {
	function wj_init_register_block()
	{
		//post list slider
		register_block_type('wj-blocks/post-list-slider', array(
			'render_callback' => 'wj_post_list_slider_render',
			'attributes' => array(
				'heading'      => array(
					'type'    => 'string',
					'default' => 'ALWAYS HERE BEER',
				),
				'array_post'    => array(
					'type'    => 'array',
					'default' => [],
				),
				'array_tags'    => array(
					'type'    => 'array',
					'default' => [],
				),
				'colorHeading'      => array(
					'type'    => 'string',
					'default' => '',
				),
				'allow_select_post' => [
					'type'    => 'boolean',
					'default' => false
				],
				'text_button' => array(
					'type'    => 'string',
					'default' => 'Continue reading'
				),
				'post_type'     => array(
					'type'    => 'string',
					'default' => 'posts'
				),
				'posts_per_page'     => array(
					'type'    => 'number',
					'default' => -1
				),
				'order_post'     => array(
					'type'    => 'string',
					'default' => 'DESC'
				),
				'className'    => array(
					'type' => 'string',
				),
				//slider opt
				'slidesToShow'    => [
					'type'    => 'number',
					'default' => 2
				],
				'slidesToScroll'  => [
					'type'    => 'number',
					'default' => 1
				],
				'arrows'          => [
					'type'    => 'boolean',
					'default' => true
				],
				'dots'            => [
					'type'    => 'boolean',
					'default' => false
				],
				'autoplay'        => [
					'type'    => 'boolean',
					'default' => false
				],
				'fade'            => [
					'type'    => 'boolean',
					'default' => false
				],
				'infinite'            => [
					'type'    => 'boolean',
					'default' => false
				],
				'centerMode'      => [
					'type'    => 'boolean',
					'default' => false
				],
				'rtl'             => [
					'type'    => 'boolean',
					'default' => false
				],
			),
		));

	}
}

add_action('init', 'wj_init_register_block');
