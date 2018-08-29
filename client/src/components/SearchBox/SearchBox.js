import React from 'react';
import TableWithIcon from '../TableWithIcon';

const SearchBox = ({ data, type }) => {
  switch (type) {
    case 'acc':
      return <TableWithIcon type="account" data={[data]} />;
    case 'block':
      return <TableWithIcon type="block" data={[data]} />;
    case 'tx':
      return <TableWithIcon type="tx" data={[data]} />;
    default:
      throw new Error('Unknown type');
  }
};

export default SearchBox;
