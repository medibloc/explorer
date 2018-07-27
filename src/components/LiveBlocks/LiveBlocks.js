import PropTypes from 'prop-types';
import React from 'react';

import TableWithIcon from '../TableWithIcon';


const LiveBlocks = ({ blocks }) => (
  <TableWithIcon type="block" data={blocks} />
);

LiveBlocks.propTypes = {
  blocks: PropTypes.array.isRequired,
};

export default LiveBlocks;
