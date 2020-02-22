import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Route } from 'react-router-dom';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function AppRoute({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (Layout) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return (
          <div>
            <Component {...props} />
          </div>
        );
      }}
    />
  );
}

AppRoute.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
};

export default AppRoute;
