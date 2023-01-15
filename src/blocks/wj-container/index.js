/**
 * BLOCK: Blocks Container
 */

// Import block dependencies and components
import Inspector from './components/inspector';
import Container from './components/container';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const { InnerBlocks } = wp.blockEditor;

const blockAttributes = {
	containerPaddingTop: {
		type: 'Object',
		default: {
			default: '10vh',
			tablet: '10vh',
			mobile: '10vh',
			sync: true,
		}
	},
	containerPaddingRight: {
		type: 'number',
	},
	containerPaddingBottom: {
		type: 'Object',
		default: {
			default: '10vh',
			tablet: '10vh',
			mobile: '10vh',
			sync: true,
		}
	},
	containerPaddingLeft: {
		type: 'number',
	},
	containerMarginTop: {
		type: 'number',
	},
	containerMarginBottom: {
		type: 'number',
	},
	containerWidth: {
		type: 'string',
	},
	containerMaxWidth: {
		type: 'number',
	},
	containerBackgroundColor: {
		type: 'string',
	},
	containerBgGradientColor: {
		type: 'string',
		default: ''
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerDimRatio: {
		type: 'number',
		default: 50,
	},
	opacityBg: {
		type: 'number',
	},
};

class EditContainerBlock extends Component {
	render() {
		// Setup the attributes
		const {
			setAttributes,
		} = this.props;

		return [
			// Show the block controls on focus
			<Inspector key={ 'wj-container-inspector-' + this.props.clientId } { ...{ setAttributes, ...this.props } } />,

			// Show the container markup in the editor
			<Container key={ 'wj-container-' + this.props.clientId } { ...this.props }>
				<InnerBlocks />
			</Container>,
		];
	}
}

// Register the block
registerBlockType( 'wj-blocks/wj-container', {
	title: __( 'Container', 'wj-blocks' ),
	description: __(
		'Add a container block to wrap several blocks in a parent container.',
		'wj-blocks'
	),
	icon: 'editor-table',
	category: 'wj-blocks',
	keywords: [
		__( 'container', 'wj-blocks' ),
		__( 'section', 'wj-blocks' ),
		__( 'wj', 'wj-blocks' ),
	],

	supports: {
		align: [ 'center', 'wide', 'full' ]
	},

	attributes: blockAttributes,

	// Render the block components
	edit: EditContainerBlock,

	// Save the attributes and markup
	save( props ) {
		// Save the block markup for the front end
		return (
			<Container { ...props }>
				<InnerBlocks.Content />
			</Container>
		);
	},getEditWrapperProps( { containerWidth } ) {
		if (
			'center' === containerWidth ||
			'wide' === containerWidth ||
			'full' === containerWidth
		) {
			return { 'data-align': containerWidth };
		}
	},
} );
