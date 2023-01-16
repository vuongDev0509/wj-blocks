/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

/**
* Styles
*/

import './styles/style.scss'
import './styles/editor.scss'


/**
 * Internal dependencies
 */
import {addResponsiveAttributes} from './utils';
import {withResponsiveSettings} from './components/with-responsive-settings';

addFilter(
    'blocks.registerBlockType',
    'wj-blocks/add-responsive-typo-attributes',
    addResponsiveAttributes
);

addFilter(
    'editor.BlockEdit',
    'wj-blocks/add-responsive-typo-controls',
    withResponsiveSettings
);
