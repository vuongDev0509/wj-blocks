/**
 * Bullet Block Wrapper
 */

const Bullet = (props) => {
	// Setup the attributes

	return (
		<div className={['antero-list-bullet-block', props.className].join(' ')}>
			{props.children}
		</div>
	)
}

export default Bullet;