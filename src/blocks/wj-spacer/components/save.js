/*
** Save
*/

const Save = (props) => {
	const { attributes, className } = props;
	const { size } = attributes;
	return (
		<div className={['wj-blocks', 'wj-block-spacer', className].join(' ')} style={(() => {
			return {
				'--size-default': size.default,
				'--size-tablet': size.tablet,
				'--size-mobile': size.mobile,
			}
		})()} data-size-default={size.default} data-size-tablet={size.tablet} data-size-mobile={size.mobile} />
	)
}

export default Save;