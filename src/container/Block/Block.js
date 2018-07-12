import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BlockchainActions } from '../../redux/actionCreators';


class Block extends Component {
  componentWillMount() {
    const { hash, height } = this.props;
    if (hash !== undefined) BlockchainActions.getBlock(hash);
    else if (height !== undefined) BlockchainActions.getBlock(height);
  }


  render() {
    const { block, loading } = this.props;
    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        { JSON.stringify(block) }
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain, widget }) => ({
  block: blockchain.block,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Block);
