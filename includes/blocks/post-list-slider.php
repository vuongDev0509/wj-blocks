<?php

// render grid products block
function wj_post_list_slider_render($atts, $content)
{
	$bl_attr = shortcode_atts([
		'heading'        => 'Your heading here',
		'array_post'        => [],
		'array_tags'        => [],
		'colorHeading'        => '',
		'allow_select_post' => false,
		'text_button'        => 'Continue reading',
		'post_type'        => 'posts',
		'order_post'        => 'DESC',
		'posts_per_page'        => -1,
		'className'     => '',
		//slider opt
		'slidesToShow' => 2,
		'slidesToScroll' => 1,
		'arrows' => true,
		'dots' => false,
		'autoplay' => false,
		'fade' => false,
		'centerMode' => false,
		'rtl' => false,
		'infinite' => false
	], $atts);

	$data_carousel = [
		'slidesToShow' => intval($bl_attr['slidesToShow']),
		'slidesToScroll' => intval($bl_attr['slidesToScroll']),
		'arrows' => $bl_attr['arrows'],
		'dots' => $bl_attr['dots'],
		'fade' => $bl_attr['fade'],
		'autoplay' => $bl_attr['autoplay'],
		'rtl' => $bl_attr['rtl'],
		'centerMode' => $bl_attr['centerMode']
	];



	$fc_post_type = $bl_attr['post_type'] == 'posts' ? 'post' : $bl_attr['post_type'];

	$query = [
		'post_type'   => $fc_post_type,
		'post_status' => 'publish',
	];

	if ($bl_attr['allow_select_post']) {
		if ($bl_attr['array_post']) {
			$query['post__in']  = $bl_attr['array_post'];
			$query['orderby'] = 'post__in';
		}
	} else {
		$query['posts_per_page'] =  $bl_attr['posts_per_page'];
		$query['orderby'] = 'date';
		$query['order'] = $bl_attr['order_post'];

		if ($bl_attr['array_tags']) {
			$tags_id = [];
			foreach ($bl_attr['array_tags'] as $value) {
				$tag = get_term_by('name', $value, 'post_tag');
				array_push($tags_id, $tag->term_id);
			}
			$query['tag__in'] = $tags_id;
		}
	}

	$error = '<div class="col-12 text-center" style="margin-bottom: 40px;">Please select post on sidebar</div>';

	ob_start();

	$classes_block = implode(' ', ['wj-blocks wj-post-list-slider', $bl_attr['className']]);

?>
	<div class="<?= $classes_block ?>">
		<div class="wj-post-list-slider-inner" data-query='<?= json_encode($query) ?>' data-carousel-post='<?= json_encode($data_carousel) ?>'>
			<div class="container">
				<?php
				if ($bl_attr['heading']) {
					echo '<h2 class="block-heading" style="color:' . $bl_attr['colorHeading'] . '">' . $bl_attr['heading'] . '</h2>';
				} ?>
			</div>
			<?php
			if ($bl_attr['allow_select_post'] && !$bl_attr['array_post']) {
				echo $error;
			} else {
				$the_query = new WP_Query($query);

				if ($the_query->have_posts()) {
					echo '<div class="wj-post-list-slider-list">';
					while ($the_query->have_posts()) {
						$the_query->the_post();
						$srcset = wp_get_attachment_image_srcset(get_post_thumbnail_id(get_the_ID()), 'full');
			?>
						<div class="wj-post-list-slider-list-item">
							<div class="wj-post-list-slider-list-item-wrap">
								<div class="wj-post-list-slider-list-item-wrap-image">
									<a href="<?= get_permalink() ?>">
										<img src="<?= get_the_post_thumbnail_url(get_the_ID(),'post-list-size') ?>" srcset="<?= $srcset ?>" alt="<?= get_the_title(); ?>" />
									</a>
								</div>
								<div class="wj-post-list-slider-list-item-wrap-content">
									<h5><a href="<?= get_permalink() ?>"><?= get_the_title(); ?></a></h5>
									<p style="-webkit-box-orient: vertical;"><?= get_the_excerpt() ?></p>
									<?php if ($bl_attr['text_button']) { ?>
										<a href="<?= get_permalink() ?>" class="read-more"> <?= $bl_attr['text_button'] ?> </a>
									<?php } ?>

								</div>
							</div>
						</div>
			<?php
					}
					echo '</div>';
				} else {
					echo '<div class="col-12 text-center" style="margin-bottom: 40px;">Not found post!</div>';
				}
			}
			?>
		</div>
	</div>
<?php
	wp_reset_postdata();

	return ob_get_clean();
}
