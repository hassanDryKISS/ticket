import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layout from 'components/Layout';
import GlobalStyle from '../../global-styles';
export default function App () {
  return (
    <>
      <Switch>
        <Route exact path='/' component={HomePage} layout={Layout} />
        <Route component={NotFoundPage} layout={Layout} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
