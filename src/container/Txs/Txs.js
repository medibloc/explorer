import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';


class Blocks extends Component {
  render() {
    const { txs } = this.props;

    return (
      <div>
        Here is the tx sound!!
        <ul>
          {
            txs.map(tx => (
              <li>
                <ContentBox>
                  {JSON.stringify(tx)}
                </ContentBox>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}


const mapStateToProps = ({ blockchain }) => ({
  txs: blockchain.txs,
});

export default connect(mapStateToProps)(Blocks);
