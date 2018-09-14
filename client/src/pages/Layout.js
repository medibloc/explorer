import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { BlockchainActions, GlobalActions, WidgetActions as w } from '../redux/actionCreators';
import { countryList } from '../config';


class Layout extends Component {
  componentWillMount() {
    const { location: { pathname: path } } = this.props;
    GlobalActions.moveUrl(path.split('/')[2]);
  }

  componentWillUpdate(nextProps) {
    const { loading, location: { pathname: path, search: prevSearch } } = this.props;
    const { location: { pathname: newPath, search: newSearch } } = nextProps;
    if (path !== newPath || prevSearch !== newSearch) {
      w.loader(BlockchainActions.getMedState());
      GlobalActions.moveUrl(newPath.split('/')[2]);
    }
    if (!loading && nextProps.loading) GlobalActions.openModal({ modalType: 'Loading' });
    else if (loading && !nextProps.loading) GlobalActions.closeModal();
    const page = parseInt(qs.parse(window.location.search).page, 10) || 1;
    GlobalActions.movePage(page);
  }

  render() {
    const currentPath = window.location.pathname.split('/')[1];
    const { children, lang } = this.props;
    if (countryList.indexOf(currentPath) === -1) return <Redirect to={`/${lang}/`} />;

    return (
      <div className="layout">
        <div className="layoutInner">
          { children }
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

Layout.defaultProps = {
  children: React.createElement('div'),
  location: {},
};

export default Layout;
