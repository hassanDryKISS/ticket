/**
 *
 * Asynchronously loads the component for AppRoute
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
