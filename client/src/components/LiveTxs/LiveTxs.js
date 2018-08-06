import PropTypes from 'prop-types';
import React from 'react';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ txs }) => (
  <TableWithIcon type="tx" data={txs} />
);

Txs.propTypes = {
  txs: PropTypes.array.isRequired,
};

export default Txs;
