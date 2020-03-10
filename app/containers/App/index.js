/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Event from 'containers/Event';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layout from 'components/Layout';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Route from '../../components/AppRoute';
import sagaHome from '../HomePage/saga';
import reducerHome from '../HomePage/reducer';
import 'antd/dist/antd.css';
// import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style
import GlobalStyle from '../../global-styles';


export function App() {
  useInjectSaga({ key: 'home', sagaHome });
  useInjectReducer({ key: 'home', reducerHome });

  return (
    <>

      <Switch>
        <Route exact path="/" component={HomePage} layout={Layout} />
        <Route exact path="/home" component={HomePage} layout={Layout} />
        <Route exact path="/event/:hallId/:id" component={Event} layout={Layout} />
        <Route component={NotFoundPage} layout={Layout} />
      </Switch>
      <GlobalStyle />
     </>
  );
}



const mapStateToProps = createStructuredSelector({
  token: selectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    profileDispatch: () => dispatch(profileAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
