
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor'
import {
	PanelBody,
	Button,
	FocalPointPicker,
	ToggleControl,
	TextControl
} from '@wordpress/components'

const ALLOWED_MEDIA_TYPES = ['image']

const instructions = (
	<p>To edit the image, you need permission to upload media.</p>
);

const Inspector = (props) => {
	const { attributes, setAttributes } = props
	const {
		imgID,
		imgUrl,
		focalPoint,
		blockPaddingBottom,
		blockPaddingTop,
		bgColor,
		bgGradientColor
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