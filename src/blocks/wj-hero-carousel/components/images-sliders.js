const ImagesSliders = (props) => {
	// Setup the attributes
	const { attributes, className } = props;
	const { blockPaddingBottom, blockPaddingTop, id, galleryUrl } = attributes

    let data = {
		slidesPerView: parseInt(attributes.slidesToShow),
		slidesToScroll: parseInt(attributes.slidesToScroll),
		autoplay: attributes.autoplay,
		spaceBetween: attributes.spaceBetween,
		loop: attributes.infinite,
		speed:attributes.speed,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
	}
	data = JSON.stringify(data)


	return (
		<div id={id} className='wj-hero-carousel-block-images wj-carousel' data-slider={data}> 
            <div className="wj-images-sliders-wrapper swiper-wrapper">
				{galleryUrl.map((value, index) => (
					<div className="swiper-slide item" key={index}> 
                        <div className="swiper-slide--image"> <img src={value} alt="image" /> </div>
					</div>
				))}
			</div>

			{attributes.dots ?
				<div class="swiper-pagination"></div>
				: ''	
			}

			{attributes.arrows ?
			    <div class="swiper-button-next"></div>
			: ""
			}

			{attributes.arrows ?
			    <div class="swiper-button-prev"></div>
			: ""
			}
        </div>
	)
}

export default ImagesSliders;