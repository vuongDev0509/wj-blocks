
jQuery(function ($) {
	"use strict";

	
	const WjImageCarousel = () => {
		const $isBlock = $('.wj-carousel');
		if (!$isBlock.length) return;

		$.each( $isBlock , function (index, value ) {
			const $data = $(this).data('slider')
			const $id   = $(this).attr("id");
			
			loadSlider($id, $data)
		} );

		function loadSlider($id, $data){
			console.log($id)
			const swiper = new Swiper(`#${$id}`, $data);
		}
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