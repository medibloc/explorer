import React from 'react';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ txsFromBlock }) => (
  <TableWithIcon type="tx" data={txsFromBlock} />
);

export default Txs;
