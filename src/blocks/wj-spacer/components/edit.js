/*
**	Edit
*/
// Internationalization
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import Inspector from './inspector';

const Edit = (props) => {

	const { attributes, className, setAttributes } = props;
	const { size } = attributes

	return (
		<Fragment>
			<Inspector { ...{ setAttributes, ...props } } />
			<div className={['wj-blocks', 'wj-block-spacer', className].join(' ')} style={(() => {
				return {
					'--size-default': size.default,
					'--size-tablet': size.tablet,
					'--size-mobile': size.mobile,
				}
			})()} />
		</Fragment>
	)
}

export default Edit;