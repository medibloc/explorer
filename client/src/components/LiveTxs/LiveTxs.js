// import PropTypes from 'prop-types';
import React from 'react';
import { sorter } from '../../lib';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ blocks }) => {
  let txs = [];
  blocks.forEach(block => {
    txs = txs.concat(block.transactions);
  });
  return <TableWithIcon type="tx" data={sorter(txs, 'timestamp')} />;
};

Txs.propTypes = {
  // txs: PropTypes.array.isRequired,
};

export default Txs;
