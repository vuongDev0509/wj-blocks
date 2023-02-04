import { __ } from '@wordpress/i18n'
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor'
import {
	FocalPointPicker,
	ToggleControl,
	PanelBody,Button,TextControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components'

const ALLOWED_MEDIA_TYPES = ['image']

const instructions = (
	<p>To edit the image, you need permission to upload media.</p>
);

const Inspector = (props) => {
	const { attributes, setAttributes } = props
	const {
		galleryID,
		galleryUrl,
		imgID,
		imgUrl,
		focalPoint,
		blockPaddingBottom,
		blockPaddingTop,
		bgColor,
		bgGradientColor,
		slidesToShow, slidesToScroll, arrows, dots,  autoplay, infinite, spaceBetween, speed
	} = attributes

	const onChangeSize = (position, value, screen) => {
		if (position === 'top') {
			let newSize = { ...blockPaddingTop }
			newSize[screen] = value
			if (screen == 'default' && blockPaddingTop.sync == true) {
				newSize.tablet = value
			}

			setAttributes({ blockPaddingTop: newSize })
		} else {
			let newSize = { ...blockPaddingBottom }
			newSize[screen] = value
			if (screen == 'default' && blockPaddingBottom.sync == true) {
				newSize.tablet = value
			}

			setAttributes({ blockPaddingBottom: newSize })
		}
	}

	const onChangeSizeResponsiveTop = (value) => {
		let newSize = { ...blockPaddingTop }
		newSize.sync = value
		setAttributes({ blockPaddingTop: newSize })
	}

	const onChangeSizeResponsiveBottom = (value) => {
		let newSize = { ...blockPaddingBottom }
		newSize.sync = value
		setAttributes({ blockPaddingBottom: newSize })
	}

	return (
		<InspectorControls>
			<PanelBody title="Images Sliders" initialOpen={true}>
                <div className="components-placeholder__fieldset">
                    <MediaUploadCheck fallback={instructions}>
                        <MediaUpload
                            title={__('Image')}
                            onSelect={(media) => {
                                let ids = media.map(e => e.id);
                                let urls = media.map(e => e.url);
                                setAttributes({
                                    galleryID: ids,
                                    galleryUrl: urls,
                                })
                            }}
                            multiple={true}
                            gallery={true}
                            allowedTypes={['image']}
                            value={galleryID}
                            render={({open}) => (
                                <Button
                                    className={!galleryID ? 'wj-image-editor editor-post-featured-image__toggle' : 'wj-gallery-sidebar editor-post-featured-image__preview'}
                                    onClick={open}>
                                    {
                                        galleryUrl.map((e, i) =>
                                            <div key={'img-' + i} className="img-item"><img src={e} alt="img" /></div>)
                                    }
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {!!galleryID &&
                    <MediaUploadCheck>
                        <MediaUpload
                            title={__('Image')}
                            onSelect={(media) => {
                                let ids = media.map(e => e.id);
                                let urls = media.map(e => e.url);
                                setAttributes({
                                    galleryID: ids,
                                    galleryUrl: urls,
                                })
                            }}
                            multiple={true}
                            gallery={true}
                            allowedTypes={['image']}
                            value={galleryID}
                            render={({open}) => (
                                <Button onClick={open} isSecondary>
                                    {__('Replace Image')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    }
                    {!!galleryID &&
                    <MediaUploadCheck>
                        <Button onClick={() => (
                            setAttributes({
                                galleryID: [],
                                galleryUrl: [],
                            })
                        )} isDestructive>
                            {__('Remove Image')}
                        </Button>
                    </MediaUploadCheck>
                    }
                </div>
            </PanelBody>

			<PanelBody title={__('Slider Setting')}>
                <label>Number slide to show</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(slidesToShow) => {
                        setAttributes({ slidesToShow })
                    }}
                    shiftStep={10} value={slidesToShow}
                />
                
                <hr />
                <label>Number slides to scroll</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(slidesToScroll) => {
                        setAttributes({ slidesToScroll })
                    }}
                    shiftStep={10} value={slidesToScroll}
                />

                <hr />
                <label>Space Between</label>
                <NumberControl
                    isShiftStepEnabled={true}
                    onChange={(spaceBetween) => {
                        setAttributes({ spaceBetween })
                    }}
                    shiftStep={5} value={spaceBetween}
                />

                <hr/>
                <TextControl
                    label="Speed"
                    value={speed}
                    onChange={(value) => setAttributes({ speed: value })}
                /> 

                <hr />
                <ToggleControl
                    label="Arrows"
                    help={arrows ? 'Enable arrows.' : 'Disable arrows.'}
                    checked={arrows}
                    onChange={() => {
                        setAttributes({ arrows: !arrows })
                    }}
                />

                <hr />
                <ToggleControl
                    label="Dots"
                    help={dots ? 'Enable dots.' : 'Disable dots.'}
                    checked={dots}
                    onChange={() => {
                        setAttributes({ dots: !dots })
                    }}
                />
                
                <hr />
                <ToggleControl
                    label="Autoplay"
                    help={autoplay ? 'Enable autoplay.' : 'Disable autoplay.'}
                    checked={autoplay}
                    onChange={() => {
                        setAttributes({ autoplay: !autoplay })
                    }}
                />

                <hr />
                <ToggleControl
                    label="Loop"
                    help={infinite ? 'Enable fade.' : 'Disable fade.'}
                    checked={infinite}
                    onChange={() => {
                        setAttributes({ infinite: !infinite })
                    }}
                />
            </PanelBody>

			<PanelBody title='Background Image'>
				<div className="components-placeholder__fieldset">
					<MediaUploadCheck fallback={instructions}>
						<MediaUpload
							title="Main Image"
							onSelect={(media) => {
								setAttributes({
									imgID: parseInt(media.id),
									imgUrl: media.url,
									srcSet: media.sizes.full.srcset
								});
							}}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={imgID}
							render={({ open }) => (
								<Button
									className={
										!imgID
											? "editor-post-featured-image__toggle"
											: "editor-post-featured-image__preview"
									}
									onClick={open}
								>
									{!imgID && "Change Image"}
									{!!imgID && <img src={imgUrl} alt="img" />}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					{!!imgID && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({
										imgID: parseInt(media.id),
										imgUrl: media.url,
										srcSet: media.sizes.full.srcset
									});
								}}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imgID}
								render={({ open }) => (
									<Button onClick={open} isSecondary>
										{"Replace Image"}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					)}

					{!!imgID && (
						<MediaUploadCheck>
							<Button
								onClick={() => {
									setAttributes({ imgID: 0, imgUrl: "", srcSet: '' });
								}}
								isDestructive
							>
								{"Remove Image"}
							</Button>
						</MediaUploadCheck>
					)}
				</div>
			</PanelBody>
			<PanelBody title='Background Position'>
				<FocalPointPicker
					label='Focal Point Picker'
					url={imgUrl}
					value={focalPoint}
					onChange={(value) => setAttributes({ focalPoint: value })}
				/>
			</PanelBody>
			<PanelBody title="Spacer Options" initialOpen={false}>
				<TextControl
					label='Padding Top'
					value={blockPaddingTop.default}
					onChange={(value) => {
						onChangeSize('top', value, 'default')
					}}
				/>

				<ToggleControl
					label='Sync Padding Top'
					help='Disable to custom padding top for each screen (Desktop, Tablet, Mobile)'
					checked={blockPaddingTop.sync}
					onChange={onChangeSizeResponsiveTop}
				/>

				{!blockPaddingTop.sync &&
					<div>
						<TextControl
							label='on Tablet (≦992px)'
							help='Set padding top for tablet'
							value={blockPaddingTop.tablet}
							onChange={(value) => {
								onChangeSize('top', value, 'tablet')
							}}
						/>
					</div>
				}
				<hr />

				<TextControl
					label='Padding Bottom'
					value={blockPaddingBottom.default}
					onChange={(value) => {
						onChangeSize('bottom', value, 'default')
					}}
				/>

				<ToggleControl
					label='Sync Padding Bottom'
					help='Disable to custom padding bottom for each screen (Desktop, Tablet, Mobile)'
					checked={blockPaddingBottom.sync}
					onChange={onChangeSizeResponsiveBottom}
				/>

				{!blockPaddingBottom.sync &&
					<div>
						<TextControl
							label='on Tablet (≦992px)'
							help='Set padding bottom for tablet'
							value={blockPaddingBottom.tablet}
							onChange={(value) => {
								onChangeSize('bottom', value, 'tablet')
							}}
						/>
					</div>
				}
			</PanelBody>
			<PanelBody title='Background Color' initialOpen={false}>
				<ColorGradientControl
					colorValue={bgColor}
					gradientValue={bgGradientColor}
					label="Choose a color or a gradient"
					onColorChange={(vl) => setAttributes({ bgColor: vl })}
					onGradientChange={(vl) => setAttributes({ bgGradientColor: vl })}
				/>
			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector