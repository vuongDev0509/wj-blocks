

const Save = (props) => {
	let { attributes, className } = props
	const { colorBg, fullwidth, widthSep, heightSep, alignBlock } = attributes;
	return (
		<div className={[
			'antero-separator-blocks',
			fullwidth ? 'separator-fullwidth' : '',
			`separator-${alignBlock}`,
			className].join(' ')}>
			<div
				className='separators'
				style={{
					backgroundColor: colorBg,
					height: heightSep,
					width: widthSep
				}} />
		</div>
	);
}

export default Save