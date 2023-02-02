import { __ } from '@wordpress/i18n'
import { Fragment, useEffect } from '@wordpress/element'
import Inspector from './inspector'

const Edit = (props) => {
    const { attributes, className, setAttributes, clientId } = props; 
    const { imgUrl, id} = attributes;
    
    useEffect(() => {
		setAttributes({ id: 'wj-' + clientId })	
	}, [id])
    
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