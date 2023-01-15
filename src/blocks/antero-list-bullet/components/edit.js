/**
 * Internal dependencies
 */
import Bullet from './bullet';
import Inspector from './inspector';
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'
/**
 * WordPress dependencies
 */

const Edit = (props) => {
	const { attributes, className, isSelected, setAttributes } = props;
	const { txtColor, values, spaceItem, column } = attributes;
	return (
		<Fragment>
			<Inspector {...props} />
			<Bullet {...props}>
				<div className={['inner-block', column ? 'column-2' : ''].join(' ')} style={(() => {
					return {
						'--textColor': txtColor,
						'--spaceItem': `${spaceItem}px`,
					}
				})()}>
					<RichText
						multiline="li"
						tagName="ul"
						onChange={(value) => setAttributes({ values: value })}
						value={values}
						placeholder='Write advanced list…'
						isSelected={isSelected}
					/>
				</div>
			</Bullet>
		</Fragment>
	)
}

export default Edit;
