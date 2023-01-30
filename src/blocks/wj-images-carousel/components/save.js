import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'

const Save = (props) => {
    const { attributes, className, setAttributes  } = props;
	const { imgUrl} = attributes;

	let data = {
		slidesPerView: parseInt(attributes.slidesToShow),
		slidesToScroll: parseInt(attributes.slidesToScroll),
		autoplay: attributes.autoplay,
		spaceBetween: attributes.spaceBetween,
		loop: attributes.infinite,
		speed:2000,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
		breakpoints: {
			0: {
			  slidesPerView: 1,
			  spaceBetween: 0,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			1200: {
				slidesPerView: parseInt(attributes.slidesToShow),
				slidesToScroll: parseInt(attributes.slidesToScroll),
				spaceBetween: attributes.spaceBetween,
			},
		},
	}
	data = JSON.stringify(data)
	return (
		<div className={['wj-blocks', 'wj-images-sliders swiper', className].join(' ')}
			data-slider={data}
		>
			<div className="wj-images-sliders-wrapper swiper-wrapper"
				style={{
					'--heightItem': attributes.heightItem,
				}}
				
			>
				{imgUrl.map((value, index) => (
					<div class="swiper-slide item" key={index}> 
						<img src={value} alt="image" />
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
export default Save;