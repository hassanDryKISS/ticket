/**
 *
 * Asynchronously loads the component for Menu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
