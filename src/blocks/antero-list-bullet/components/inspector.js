/**
 * 
 * Inspector
 * 
 */

// Setup the block
import { __ } from '@wordpress/i18n'
// Import block components
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { RangeControl, PanelBody, ToggleControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { txtColor, spaceItem, column } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={'General'} initialOpen={false}>
				<ToggleControl
					label="2 Columns"
					checked={column}
					onChange={() => {
						setAttributes({ column: !column });
					}}
				/>
				<RangeControl
					label='Space Item'
					value={spaceItem || 17}
					onChange={(vl) => setAttributes({ spaceItem: vl })}
					min={10}
					max={100}
					beforeIcon="image-flip-vertical"
					allowReset
				/>
			</PanelBody>
			<PanelColorSettings
				title={__('Color Text')}
				initialOpen={false}
				colorSettings={[
					{
						value: txtColor,
						onChange: (value) => setAttributes({ txtColor: value }),
						label: __('Color')
					},
				]}
			/>
		</InspectorControls>
	)
}

export default Inspector;

