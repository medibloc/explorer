import React from 'react';

import { GlobalActions } from '../redux/actionCreators';


const withLoading = WrappedComponent => (props) => {
  const { loading } = props;
  if (loading) GlobalActions.openModal({ modalType: 'Loading' });
  else GlobalActions.closeModal();
  return <WrappedComponent {...props} />;
};

export default withLoading;
