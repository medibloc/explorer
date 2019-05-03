import PropTypes from 'prop-types';
import React from 'react';

import TableWithIcon from '../TableWithIcon';


const LiveBlocks = ({ blocks, lang, mode }) => (
  <TableWithIcon
    type="block"
    data={blocks}
    lang={lang}
    mode={mode}
  />
);

LiveBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

export default LiveBlocks;
