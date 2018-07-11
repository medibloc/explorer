import React from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';


const Txs = ({ txs }) => (
  <div>
    TXS
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

const mapStateToProps = ({ blockchain }) => ({
  txs: blockchain.txs,
});

export default connect(mapStateToProps)(Txs);
