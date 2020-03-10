/*
 * Event Messages
 *
 * This contains all the text for the Event container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Event';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Event container!',
  },
});
