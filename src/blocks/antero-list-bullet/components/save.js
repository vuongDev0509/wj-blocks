/**
 * Internal dependencies
 */
import Bullet from "./bullet";

/**
 * WordPress dependencies
 */


const Save = (props) => {
	const { attributes } = props;
	const { values, txtColor, spaceItem, column } = attributes;

	return (
		<Bullet {...props}>
			<div className={['inner-block', column ? 'column-2' : ''].join(' ')}
				style={(() => {
					return {
						'--textColor': txtColor,
						'--spaceItem': spaceItem,
					}
				})()}>
				<ul 
					data-aos="fade-up"
					data-aos-duration="600"
					data-aos-delay="0"
					data-aos-easing="ease-in-out"
				>
					{values}
				</ul>
			</div>
		</Bullet>

	)
}

export default Save;
