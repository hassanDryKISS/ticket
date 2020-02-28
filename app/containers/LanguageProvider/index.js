/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import {changeLocale} from './actions';

import { makeSelectLocale } from './selectors';

export function LanguageProvider(props) {
  useEffect(() => {
    props.changeLocale('fa')
  }, [])
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
  changeLocale: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLocale: (lang) => dispatch(changeLocale(lang)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
