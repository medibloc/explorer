import PropTypes from 'prop-types';
import React from 'react';
import { sorter } from '../../lib';

import TableWithIcon from '../TableWithIcon';


const Txs = ({ liveTxs, lang, mode }) => (
  <TableWithIcon
    lang={lang}
    mode={mode}
    type="tx"
    data={sorter(liveTxs, 'blockHeight')}
  />
);

Txs.propTypes = {
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  liveTxs: PropTypes.array,
};

Txs.defaultProps = {
  liveTxs: [],
};

export default Txs;
