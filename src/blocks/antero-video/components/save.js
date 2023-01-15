/***
 * 
 * Save
 * 
 */

const Save = (props) => {
	const { attributes } = props
	const {
		videoURL,
		videoSourceType,
		videoFullWidth,
		videoWidth,
		videoHeight,
		poster,
		openInLightbox,
		autoPlay,
		loop,
		muted,
		playback,
		playsinline,
		preload
	} = attributes;

	const blockClassName = [
		'antero-video-block',
		!!videoFullWidth && 'full-width',
		!!openInLightbox && !!videoURL && 'antero-video-lightbox',
	].filter(Boolean).join(' ');

	const videoWrapperClass = [
		'antero-video-wrapper',
		!!videoFullWidth && 'full-width',
		!openInLightbox && 'no-lightbox',
	].filter(Boolean).join(' ');

	let videoAttributes = [];
	if (loop) videoAttributes.push('loop');
	if (muted) videoAttributes.push('muted');
	if (autoPlay) videoAttributes.push('autoplay');
	if (playback) videoAttributes.push('controls');
	if (playsinline) videoAttributes.push('playsinline');

	return (
		<div className={blockClassName}
			data-video={videoURL}
			data-source={videoSourceType}
			data-video-attr={videoAttributes.join(',')}
			data-video-preload={preload}
		>
			{!openInLightbox && (
				<div className={videoWrapperClass}>
					{((videoSourceType === 'youtube' || videoSourceType === 'vimeo') &&
						<iframe src={videoURL}
							width={videoWidth}
							height={videoHeight}
							frameBorder="0"
							allowFullScreen
						/>
					)
						|| (videoSourceType === 'local' &&
							<video className={videoFullWidth && 'full-width'}
								width={videoWidth}
								height={videoHeight}
								poster={poster}
								controls={playback}
								loop={loop}
								muted={muted}
								autoPlay={autoPlay}
								preload={preload}
								playsInline={playsinline}
							>
								<source src={videoURL} />
								{'Your browser does not support HTML5 video.'}
							</video>
						)
						|| !videoSourceType && <div style={{ width: videoWidth, height: videoHeight }} />}
					<div className="video-buttons">
						<span className='antero-play-button'></span>
						<span className='antero-pause-button'></span>
					</div>
				</div>
			)}
			{!!openInLightbox &&
				<div className={videoWrapperClass} style={{ width: videoWidth }}>
					<div className="antero-video-poster" style={{ backgroundImage: `url(${poster || ''})` }} />
					<div className="antero-button-wrapper" style={{ height: videoHeight }}>
						<div className="video-buttons">
							<span className='antero-play-button'></span>
							<span className='antero-pause-button'></span>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default Save