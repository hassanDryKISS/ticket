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
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layout from 'components/Layout';
import Route from '../../components/AppRoute';

import 'antd/dist/antd.css';
// import 'ant-design-pro/dist/ant-design-pro.css'; // Import whole style
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} layout={Layout} />
        <Route exact path="/home" component={HomePage} layout={Layout} />
        <Route exact path="/event/:eventId" component={HomePage} layout={Layout} />
        <Route component={NotFoundPage} layout={Layout} />
      </Switch>
      <GlobalStyle />
     </>
  );
}
