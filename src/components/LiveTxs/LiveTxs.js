import React from 'react';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ txs }) => (
  <TableWithIcon type="tx" data={txs} />
);

export default Txs;
