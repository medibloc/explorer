import React, { Component } from 'react';

import { withLoading } from '../hoc';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../redux/actionCreators';


class Layout extends Component {
  componentWillMount() {
    const { location: { pathname: path } } = this.props;
    GlobalActions.moveUrl(path.split('/')[1]);
  }

  componentWillUpdate(nextProps) {
    const { location: { pathname: path } } = this.props;
    if (path !== nextProps.location.pathname) {
      w.loader(BlockchainActions.getMedState());
      GlobalActions.moveUrl(nextProps.location.pathname.split('/')[1]);
    }
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


export default withLoading(Layout);
