<?php

add_filter('default_content', '__default_content', 10, 2);

function __default_content($content, $post)
{
	$post_type = get_post_type($post);

	if ($post_type == 'fc-products') {
		$content = '';
	} 

	return $content;
}