import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import Inspector from './inspector'

const Edit = (props) => {
    const { attributes, className, setAttributes  } = props; 
    const { imgUrl} = attributes;

    return(
        <Fragment>            
            <Inspector {...props} />

            <div className={['wj-blocks', 'wj-images-sliders', 'wj-slider-edit', className].join(' ')}>
                <div className="wj-images-sliders-wrapper"
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
            </div>
        </Fragment>
    )
}
export default Edit;