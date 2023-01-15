/**
 * Inspector Controls
 */

/**
 * Internal dependencies.
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
import {
	InspectorControls,
	MediaUpload,
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

// Import Inspector components
import { Button, Icon, PanelBody, RangeControl, ToggleControl, opacityBg, TextControl } from '@wordpress/components';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		// Setup the attributes
		const {
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerMaxWidth,
			containerBackgroundColor,
			containerBgGradientColor,
			containerDimRatio,
			containerImgURL,
			containerImgID,
		} = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = (img) => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			});
		};

		const onChangeSize = (position, value, screen) => {
			if (position === 'top') {
				let newSize = { ...containerPaddingTop }
				newSize[screen] = value
				if (screen == 'default' && containerPaddingTop.sync == true) {
					newSize.tablet = value
					newSize.mobile = value
				}

				setAttributes({ containerPaddingTop: newSize })
			} else {
				let newSize = { ...containerPaddingBottom }
				newSize[screen] = value
				if (screen == 'default' && containerPaddingBottom.sync == true) {
					newSize.tablet = value
					newSize.mobile = value
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
			<InspectorControls key="inspector">
				<PanelBody
					title={__('Container Options', 'wj-blocks')}
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
						help={__('Disable to custom padding top for each screen (Desktop, Tablet, Mobile)')}
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
							<TextControl
								label={__('on Mobile (≦767px)')}
								help={__('Set padding top for mobile')}
								value={containerPaddingTop.mobile}
								onChange={(value) => {
									onChangeSize('top', value, 'mobile')
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
						help={__('Disable to custom padding bottom for each screen (Desktop, Tablet, Mobile)')}
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
							<TextControl
								label={__('on Mobile (≦767px)')}
								help={__('Set padding bottom for mobile')}
								value={containerPaddingBottom.mobile}
								onChange={(value) => {
									onChangeSize('bottom', value, 'mobile')
								}}
							/>
						</div>
					}
					<hr />

					<RangeControl
						label={__('Padding Left (%)', 'wj-blocks')}
						value={containerPaddingLeft}
						onChange={(value) =>
							this.props.setAttributes({
								containerPaddingLeft: value,
							})
						}
						min={0}
						max={30}
						step={0.5}
					/>

					<RangeControl
						label={__('Padding Right (%)', 'wj-blocks')}
						value={containerPaddingRight}
						onChange={(value) =>
							this.props.setAttributes({
								containerPaddingRight: value,
							})
						}
						min={0}
						max={30}
						step={0.5}
					/>

					<RangeControl
						label={__('Margin Top (%)', 'wj-blocks')}
						value={containerMarginTop}
						onChange={(value) =>
							this.props.setAttributes({
								containerMarginTop: value,
							})
						}
						min={0}
						max={30}
						step={1}
					/>

					<RangeControl
						label={__('Margin Bottom (%)', 'wj-blocks')}
						value={containerMarginBottom}
						onChange={(value) =>
							this.props.setAttributes({
								containerMarginBottom: value,
							})
						}
						min={0}
						max={30}
						step={0.5}
					/>

					<RangeControl
						label={__(
							'Inside Container Max Width (px)',
							'wj-blocks'
						)}
						value={containerMaxWidth}
						onChange={(value) =>
							this.props.setAttributes({
								containerMaxWidth: value,
							})
						}
						min={500}
						max={1600}
						step={1}
					/>
				</PanelBody>

				<PanelBody
					title={__('Background Options', 'wj-blocks')}
					initialOpen={false}
				>
					<p>
						{__(
							'Select a background image:',
							'wj-blocks'
						)}
					</p>
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={containerImgID}
						render={({ open }) => (
							<div>
								<Button
									className="wj-container-inspector-media"
									label={__(
										'Edit image',
										'wj-blocks'
									)}
									onClick={open}
								>
									<Icon icon="format-image" />
									{__(
										'Select Image',
										'wj-blocks'
									)}
								</Button>

								{containerImgURL &&
									!!containerImgURL.length && (
										<Button
											className="wj-container-inspector-media"
											label={__(
												'Remove Image',
												'wj-blocks'
											)}
											onClick={onRemoveImage}
										>
											<Icon icon="dismiss" />
											{__(
												'Remove',
												'wj-blocks'
											)}
										</Button>
									)}
							</div>
						)}
					></MediaUpload>

					{containerImgURL && !!containerImgURL.length && (
						<RangeControl
							label={__('Image Opacity', 'wj-blocks')}
							value={containerDimRatio}
							onChange={(value) =>
								this.props.setAttributes({
									containerDimRatio: value,
								})
							}
							min={0}
							max={100}
							step={10}
						/>
					)}
				</PanelBody>
				<PanelBody title={__('Background Color', 'wj-blocks')}
					initialOpen={false}>
					<RangeControl
						label={__('Opacity', 'wj-blocks')}
						value={opacityBg}
						onChange={(value) =>
							this.props.setAttributes({
								opacityBg: value,
							})
						}
						min={0}
						max={1}
						step={0.1}
					/>
					<ColorGradientControl
						colorValue={containerBackgroundColor}
						gradientValue={containerBgGradientColor}
						gradients={[
							{
								name: 'gradient-primary',
								gradient:
									'linear-gradient(180deg, #FFFFFF 0%, #D2BDB9 0.01%, #FFFFFF 17.71%, #FFFFFF 76.04%, #D2BDB9 100%)',
								slug: 'gradient-primary',
							},
							{
								name: 'gradient-secondary',
								gradient:
									'linear-gradient(180deg, #D2BDB9 0%, #FFFFFF 15.1%, #FFFFFF 30.73%, #D2BDB9 44.02%, #FFFFFF 52.88%, #FFFFFF 82.29%, #D2BDB9 100%)',
								slug: 'gradient-secondary',
							},
							{
								name: 'Light green cyan to vivid green cyan',
								gradient:
									'linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%)',
								slug: 'light-green-cyan-to-vivid-green-cyan',
							},
							{
								name: 'Luminous vivid amber to luminous vivid orange',
								gradient:
									'linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%)',
								slug: 'luminous-vivid-amber-to-luminous-vivid-orange',
							},
						]}
						label={__("Choose a color or a gradient")}
						onColorChange={(vl) => setAttributes({ containerBackgroundColor: vl })}
						onGradientChange={(vl) => setAttributes({ containerBgGradientColor: vl })}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
