
jQuery(function ($) {
	"use strict";

	
	const WjImageCarousel = () => {
		const $isBlock = $('.wj-images-sliders');
		if (!$isBlock.length) return
		const $data = $isBlock.data('slider')
		
		var swiper = new Swiper('.wj-images-sliders', $data);
	}

	$(window).on('load', function () {
		
	});

	$(window).scroll(function() {

	});

	$(window).on('resize', function () {

	});

	$(document).ready(function (){
		WjImageCarousel()
	});
});