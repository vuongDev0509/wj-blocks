const { __ } = wp.i18n;
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
	RangeControl,
	TextControl
} from '@wordpress/components'
import { get } from 'lodash'
import { select, useSelect } from '@wordpress/data'
const ALLOWED_MEDIA_TYPES = ['image']

const instructions = (
	<p>To edit the image, you need permission to upload media.</p>
);



const Inspector = (props) => {
	const { attributes, setAttributes, mediaBG } = props
	const { imgID, focalPoint, containerWidth, bgColor, srcSet, bgGradientColor, containerPaddingTop, containerPaddingBottom } = attributes

	const onChangeSize = (position, value, screen) => {
		if (position === 'top') {
			let newSize = { ...containerPaddingTop }
			newSize[screen] = value
			if (screen == 'default' && containerPaddingTop.sync == true) {
				newSize.tablet = value
			}

			setAttributes({ containerPaddingTop: newSize })
		} else {
			let newSize = { ...containerPaddingBottom }
			newSize[screen] = value
			if (screen == 'default' && containerPaddingBottom.sync == true) {
				newSize.tablet = value
			}

			setAttributes({ containerPaddingBottom: newSize })
		}
	}

	const onChangeSizeResponsiveTop = (value) => {
		let newSize = { ...containerPaddingTop }
		newSize.sync = value
		setAttributes({ containerPaddingTop: newSize })
	}

	const onChangeSizeResponsiveBottom = (value) => {
		let newSize = { ...containerPaddingBottom }
		newSize.sync = value
		setAttributes({ containerPaddingBottom: newSize })
	}

	return (
		<InspectorControls>
			<PanelBody title='General'>
				<RangeControl
					label="Max Width Container"
					value={containerWidth}
					onChange={(value) => setAttributes({ containerWidth: value })}
					min={100}
					step={1}
					max={1920}
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
									{!!imgID && mediaBG && <img src={mediaBG.source_url} alt="img" />}
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
									setAttributes({ imgID: 0, imgUrl: "", srcSet: "" });
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
					url={!!imgID && mediaBG && mediaBG.source_url}
					value={focalPoint}
					onChange={(value) => setAttributes({ focalPoint: value })}
				/>
			</PanelBody>
			<PanelBody title='Background Color'>
				<ColorGradientControl
					colorValue={bgColor}
					gradientValue={bgGradientColor}
					label="Choose a color or a gradient"
					onColorChange={(vl) => setAttributes({ bgColor: vl })}
					onGradientChange={(vl) => setAttributes({ bgGradientColor: vl })}
				/>
			</PanelBody>
			<PanelBody
				title={__('Spacer Options', 'wj-blocks')}
				initialOpen={true}
			>
				<TextControl
					label={__('Padding Top')}
					value={containerPaddingTop.default}
					onChange={(value) => {
						onChangeSize('top', value, 'default')
					}}
				/>

				<ToggleControl
					label={__('Sync Padding Top')}
					help={__('Disable to custom padding top for each screen (Desktop, Tablet)')}
					checked={containerPaddingTop.sync}
					onChange={onChangeSizeResponsiveTop}
				/>

				{!containerPaddingTop.sync &&
					<div>
						<TextControl
							label={__('on Tablet (≦992px)')}
							help={__('Set padding top for tablet')}
							value={containerPaddingTop.tablet}
							onChange={(value) => {
								onChangeSize('top', value, 'tablet')
							}}
						/>
					</div>
				}
				<hr />

				<TextControl
					label={__('Padding Bottom')}
					value={containerPaddingBottom.default}
					onChange={(value) => {
						onChangeSize('bottom', value, 'default')
					}}
				/>

				<ToggleControl
					label={__('Sync Padding Bottom')}
					help={__('Disable to custom padding bottom for each screen (Desktop, Tablet)')}
					checked={containerPaddingBottom.sync}
					onChange={onChangeSizeResponsiveBottom}
				/>

				{!containerPaddingBottom.sync &&
					<div>
						<TextControl
							label={__('on Tablet (≦992px)')}
							help={__('Set padding bottom for tablet')}
							value={containerPaddingBottom.tablet}
							onChange={(value) => {
								onChangeSize('bottom', value, 'tablet')
							}}
						/>
					</div>
				}

			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector