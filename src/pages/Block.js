import React from 'react';
import queryString from 'query-string';

import BlockContainer from '../container/Block';


const Block = ({ location }) => {
  const query = queryString.parse(location.search);
  let BlockWrapper = null;
  if (query.hash) {
    BlockWrapper = <BlockContainer hash={query.hash} />;
  } else if (query.height) {
    BlockWrapper = <BlockContainer height={query.height} />;
  } else {
    BlockWrapper = <BlockContainer />;
  }


  return (
    <div>
      <h2>
        BLOCK Detail info
      </h2>
      { BlockWrapper }
    </div>
  );
};

export default Block;
