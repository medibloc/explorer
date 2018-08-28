import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { BlockchainActions, GlobalActions, WidgetActions as w } from '../redux/actionCreators';
import qs from "query-string";


class Layout extends Component {
  componentWillMount() {
    const { location: { pathname: path } } = this.props;
    GlobalActions.moveUrl(path.split('/')[1]);
  }

  componentWillUpdate(nextProps) {
    const { loading, location: { pathname: path } } = this.props;
    const { location: { pathname: newPath } } = nextProps;
    if (path !== newPath) {
      w.loader(BlockchainActions.getMedState());
      GlobalActions.moveUrl(newPath.split('/')[1]);
    }
    if (!loading && nextProps.loading) GlobalActions.openModal({ modalType: 'Loading' });
    else if (loading && !nextProps.loading) GlobalActions.closeModal();
    const page = parseInt(qs.parse(window.location.search).page, 10) || 1;
    GlobalActions.movePage(page);
  }

  render() {
    const { children } = this.props;
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
  children: PropTypes.arrayOf(PropTypes.element),
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

Layout.defaultProps = {
  children: React.createElement('div'),
  location: {},
};

export default Layout;
