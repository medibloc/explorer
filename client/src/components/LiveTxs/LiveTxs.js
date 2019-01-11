import PropTypes from 'prop-types';
import React from 'react';
import { sorter } from '../../lib';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ liveTxs }) => (
  <TableWithIcon type="tx" data={sorter(liveTxs, 'receipt.timestamp')} />
);

Txs.propTypes = {
  liveTxs: PropTypes.array,
};

Txs.defaultProps = {
  liveTxs: [],
};

export default Txs;
