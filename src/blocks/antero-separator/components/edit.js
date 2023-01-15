
import { Fragment } from '@wordpress/element'
import Inspector from './inspector'

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { colorBg, fullwidth, widthSep, heightSep, alignBlock } = attributes;

	return (
		<Fragment>
			<Inspector {...props} />
			<div className={[
				'antero-blocks',
				'antero-separator-blocks',
				fullwidth ? 'separator-fullwidth' : '',
				`separator-${alignBlock}`,
				'block-editor',
				className
			].join(' ')}>
				<div
					className='separators'
					style={{
						backgroundColor: colorBg,
						height: heightSep,
						width: widthSep
					}} />
			</div>
		</Fragment>
	)
}

export default Edit