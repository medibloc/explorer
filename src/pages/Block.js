import React from 'react';


import BlockContainer from '../container/Block';


const Block = ({ location, match }) => {
  const path = queryString.parse(location.search);
  console.log(path)
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
