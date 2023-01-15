import { Fragment, useState } from '@wordpress/element'
import {
	InspectorControls,
	BlockControls,
	MediaUpload
} from '@wordpress/block-editor'
import {
	RangeControl,
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	Button,
	Dashicon,
	Spinner,
	ToolbarGroup,
	ToolbarButton,
	Disabled
} from '@wordpress/components'

const videoHostIcon = {
	youtube: (
		<svg id="Social_Icons" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
			<g id="_x34__stroke">
				<g id="Youtube_1_">
					<rect clipRule="evenodd" fill="none" height="128" width="128" />
					<path clipRule="evenodd" d="M126.72,38.224c0,0-1.252-8.883-5.088-12.794    c-4.868-5.136-10.324-5.16-12.824-5.458c-17.912-1.305-44.78-1.305-44.78-1.305h-0.056c0,0-26.868,0-44.78,1.305    c-2.504,0.298-7.956,0.322-12.828,5.458C2.528,29.342,1.28,38.224,1.28,38.224S0,48.658,0,59.087v9.781    c0,10.433,1.28,20.863,1.28,20.863s1.248,8.883,5.084,12.794c4.872,5.136,11.268,4.975,14.116,5.511    c10.24,0.991,43.52,1.297,43.52,1.297s26.896-0.04,44.808-1.345c2.5-0.302,7.956-0.326,12.824-5.462    c3.836-3.912,5.088-12.794,5.088-12.794S128,79.302,128,68.868v-9.781C128,48.658,126.72,38.224,126.72,38.224z M50.784,80.72    L50.78,44.501l34.584,18.172L50.784,80.72z" fill="#CE1312" fillRule="evenodd" id="Youtube" />
				</g>
			</g>
		</svg>
	),
	vimeo: (
		<svg height="25" viewBox="0 0 32 32" width="25" xmlns="http://www.w3.org/2000/svg">
			<g>
				<circle cx="16" cy="16" id="BG" r="16" fill="#5FCCFF" />
				<path d="M24,12.4c-0.1,1.6-1.2,3.7-3.3,6.4c-2.2,2.8-4,4.2-5.5,4.2        c-0.9,0-1.7-0.9-2.4-2.6c-0.4-1.6-0.9-3.2-1.3-4.7c-0.5-1.7-1-2.6-1.5-2.6c-0.1,0-0.5,0.3-1.3,0.8l-0.8-1        c0.8-0.7,1.6-1.4,2.3-2.1c1.1-0.9,1.8-1.4,2.4-1.4c1.2-0.1,2,0.7,2.3,2.5c0.3,2,0.5,3.2,0.6,3.7c0.4,1.6,0.8,2.4,1.2,2.4        c0.3,0,0.8-0.5,1.5-1.6c0.7-1.1,1-1.9,1.1-2.4c0.1-0.9-0.3-1.4-1.1-1.4c-0.4,0-0.8,0.1-1.2,0.3c0.8-2.6,2.3-3.8,4.5-3.7        C23.3,9.2,24.1,10.3,24,12.4" id="Vimeo" fill="#FFFFFF" />
			</g>
		</svg>
	),
	local: (
		<svg height="25" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg">
			<path clipRule="evenodd" d="M22.506,21v0.016L17,15.511V19c0,1.105-0.896,2-2,2h-1.5H3H2c-1.104,0-2-0.895-2-2  v-1l0,0V6l0,0V5c0-1.104,0.896-1.999,2-1.999h1l0,0h10.5l0,0H15c1.104,0,2,0.895,2,1.999v3.516l5.5-5.5V3.001  c0.828,0,1.5,0.671,1.5,1.499v15C24,20.327,23.331,20.996,22.506,21z" fillRule="evenodd" />
		</svg>
	),
};

const Edit = (props) => {

	const [ fetching, setfetching ] = useState( false );
	const { isSelected, attributes, clientId, setAttributes } = props;
	const {
		videoURL,
		videoID,
		videoSourceType,
		videoTitle,
		videoFullWidth,
		videoWidth,
		videoHeight,
		poster,
		posterID,
		openInLightbox,
		autoPlay,
		loop,
		muted,
		playback,
		playsinline,
		preload,
	} = attributes;

	const blockClassName = [
		'antero-video-block',
		!!openInLightbox && !!videoURL && 'antero-video-lightbox',
	].filter(Boolean).join(' ');

	const videoWrapperClass = [
		'antero-video-wrapper',
		!!videoFullWidth && 'full-width',
		!openInLightbox && 'no-lightbox',
	].filter(Boolean).join(' ');

	const blockId = 'antero-video-' + clientId;

	const fetchVideoInfo = () => {
		let realID = videoID;
		if (!!videoID) {

			setfetching(true);

			let url = '';
			if (videoID.match(/^\d+$/g)) {
				url = `https://vimeo.com/${videoID}`
			} else {
				url = `https://www.youtube.com/watch?v=${videoID}`
			}

			if (videoID.indexOf('http') > -1) {
				url = videoID;
			}

			if (videoID.match(/youtube.com/)) {
				realID = videoID.split('v=');
				realID = realID[1];
			} else if (videoID.match(/youtu.be|vimeo.com/)) {
				realID = videoID.split('/');
				realID = realID[realID.length - 1];
			}

			if (!realID) realID = '';

			if (realID.indexOf('&') > -1)
				realID = realID.substring(0, realID.indexOf('&'));

			wp.apiFetch({ path: wp.url.addQueryArgs(`/oembed/1.0/proxy?url=${encodeURIComponent(url)}`) }).then(
				(obj) => {
					setfetching(false);
					if (!!obj.title && !!obj.provider_name) {
						setAttributes({
							videoTitle: obj.title,
							poster: !!posterID ? poster : obj.thumbnail_url,
						});

						switch (obj.provider_name) {
							case 'YouTube':
								setAttributes({
									videoSourceType: 'youtube',
									videoURL: openInLightbox ? `https://www.youtube.com/embed/${realID}?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0&wmode=transparent&autoplay=1&controls=0&loop=1&mute=1&modestbranding=1&showinfo=0&autohide=1` : `https://www.youtube.com/embed/${realID}?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0&wmode=transparent&autoplay=0&controls=0&loop=1&mute=1&modestbranding=1&showinfo=0&autohide=1`,
								});
								break;
							case 'Vimeo':
								setAttributes({
									videoSourceType: 'vimeo',
									videoURL: openInLightbox ? `https://player.vimeo.com/video/${realID}?autoplay=1&byline=0&muted=1&loop=1&title=0&portrait=0&sidedock=0&controls=0` : `https://player.vimeo.com/video/${realID}?autoplay=0&byline=0&muted=1&loop=1&title=0&portrait=0&sidedock=0&controls=0`,
								});
								break;
							default:
								break;
						}
					} else {
						setAttributes({
							videoTitle: 'VIDEO_FAIL_TO_LOAD',
							poster: '',
						});
					}
				}
			).catch((error) => {
				setfetching(false);
				setAttributes({
					videoTitle: 'VIDEO_FAIL_TO_LOAD',
					poster: '',
				});
			})
		}
	}

	const loadLocalVideo = (video, blockId) => {
		setAttributes(
			{
				videoURL: video.url,
				videoID: video.id,
				videoTitle: video.title,
				videoSourceType: 'local',
				openInLightbox: false,
			}
		);
		if (document.querySelector('#' + blockId + ' video') != null) {
			document.querySelector('#' + blockId + ' video').pause();
			document.querySelector('#' + blockId + ' video').load();
		}
	}

	const replaceUrlVideo = () => {
		let url = '';
		if (!openInLightbox)
			url = videoURL.replace("autoplay=0", "autoplay=1");
		else
			url = videoURL.replace("autoplay=1", "autoplay=0");
		setAttributes({ videoURL: url })
	}

	return (
		<Fragment>
			{((!!poster && openInLightbox) || (!openInLightbox && videoSourceType === 'local')) &&
				<BlockControls>
					<ToolbarGroup>
						<MediaUpload
							allowedTypes={["image"]}
							value={posterID}
							onSelect={(image) => setAttributes({ poster: image.url, posterID: image.id })}
							render={({ open }) => (
								<ToolbarButton
									className="components-toolbar__control"
									label='Change image preview'
									icon="edit"
									onClick={open}
								/>
							)}
						/>
						<ToolbarButton
							className="components-toolbar__control"
							label='Remove image preview'
							icon="no"
							onClick={() => setAttributes({ poster: undefined, posterID: undefined })}
						/>
					</ToolbarGroup>
				</BlockControls>
			}
			<InspectorControls>
				<PanelBody title='Advanced Video Settings'>
					<ToggleControl
						label='Open video in light box'
						help='Lightbox offers additional display options.'
						checked={openInLightbox}
						onChange={() => {
							setAttributes({ openInLightbox: !openInLightbox })
							replaceUrlVideo()
						}}
					/>

					{videoSourceType === 'local' &&
						<Fragment>
							<ToggleControl
								label='Autoplay'
								checked={autoPlay}
								onChange={() => setAttributes({ autoPlay: !autoPlay })}
							/>

							<ToggleControl
								label='Loop'
								checked={loop}
								onChange={() => setAttributes({ loop: !loop })}
							/>

							<ToggleControl
								label='Muted'
								checked={muted}
								onChange={() => setAttributes({ muted: !muted })}
							/>

							<ToggleControl
								label='Playback Controls'
								checked={playback}
								onChange={() => setAttributes({ playback: !playback })}
							/>

							<ToggleControl
								label='Play inline'
								checked={playsinline}
								onChange={() => setAttributes({ playsinline: !playsinline })}
							/>

							<SelectControl
								label='Video preloading'
								value={preload}
								options={[
									{ label: 'Auto', value: 'auto' },
									{ label: 'Metadata', value: 'metadata' },
									{ label: 'None', value: 'none' },
								]}
								onChange={(value) => setAttributes({ preload: value })}
							/>
						</Fragment>
					}

					<ToggleControl
						label='Full width'
						checked={videoFullWidth}
						onChange={() => setAttributes({ videoFullWidth: !videoFullWidth })}
					/>
					{!videoFullWidth &&
						<RangeControl
							label='Video width'
							value={videoWidth}
							min={100}
							max={1000}
							onChange={(value) => setAttributes({ videoWidth: value })}
						/>
					}
					<RangeControl
						label='Video height'
						value={videoHeight}
						min={300}
						max={700}
						onChange={(value) => setAttributes({ videoHeight: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={blockClassName} id={blockId}>
				{!!openInLightbox &&
					<div className={videoWrapperClass} style={{ width: videoWidth, height: videoHeight }}>
						<div className="antero-video-poster" style={{ backgroundImage: `url(${poster || ''})` }} />
						<div className="antero-button-wrapper">
							{!poster &&
								<MediaUpload
									allowedTypes={["image"]}
									onSelect={(media) => setAttributes({ poster: media.url, posterID: media.id })}
									value={posterID}
									render={({ open }) => (
										<Button
											className="button button-large"
											onClick={open}
										>
											Select image preview
										</Button>
									)}
								/>
							}
							<div className="video-buttons">
								<span className='antero-play-button'></span>
								<span className='antero-pause-button'></span>
							</div>
						</div>
						<div className='layoutblock'></div>
					</div>
				}
				{!openInLightbox && (
					<div className={videoWrapperClass}>
						{((videoSourceType === 'youtube' || videoSourceType === 'vimeo') &&
							<iframe src={videoURL}
								frameBorder="0"
								allowFullScreen
								style={{ width: videoWidth, height: videoHeight }}
							/>
						)
							|| (videoSourceType === 'local' && (
								<Disabled>
									<video width={videoWidth}
										height={videoHeight}
										poster={poster}
										controls={playback}
										muted={muted}
									>
										<source src={videoURL} />
										{'Your browser does not support HTML5 video.'}
									</video>
								</Disabled>
							))
							|| !videoSourceType && <div style={{ width: videoWidth, height: videoHeight }} />}
						<div className="video-buttons">
							<span className='antero-play-button'></span>
							<span className='antero-pause-button'></span>
						</div>
						<div className='layoutblock'></div>
					</div>
				)}
				{isSelected &&
					<div className="antero-video-input-block">
						<div className="antero-video-input">
							<Dashicon className="antero-video-link-icon" icon="admin-links" />
							<TextControl
								placeholder='Youtube/Vimeo video URL/ID…'
								value={videoID}
								onChange={(value) => {
									setAttributes({ videoID: value, videoURL: '', videoTitle: undefined, videoSourceType: '' });
								}}
							/>
							<Button
								className="button button-large"
								disabled={!videoID || videoSourceType === 'local'}
								style={{ height: '31px' }}
								onClick={() => fetchVideoInfo()}
							>
								Fetch video content
							</Button>
							<MediaUpload
								allowedTypes={["video"]}
								value={videoID}
								onSelect={(video) => loadLocalVideo(video, blockId)}
								render={({ open }) => (
									<Button
										className="button button-large is-primary"
										onClick={open}
										style={{ marginLeft: '5px' }}
									>
										Load local video
									</Button>
								)}
							/>
						</div>
						<div className="antero-current-video-desc"
							style={{ minWidth: '50%', margin: '10px auto', textAlign: 'center' }}
						>
							<strong>Current Video:</strong>
							<span title={videoSourceType}
								style={{
									width: '25px',
									height: '25px',
									margin: '-1px 5px 0',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								{videoHostIcon[videoSourceType] || (fetching && <Spinner />)}
							</span>
							<span>
								{
									(videoTitle === 'VIDEO_FAIL_TO_LOAD' && <strong style={{ color: 'red' }}>Wrong video URL/ID. Please try another.</strong>)
									|| videoTitle
									|| 'Not selected yet.'
								}
							</span>
						</div>
					</div>
				}
			</div>
		</Fragment>
	)
}

export default Edit;