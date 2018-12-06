const isIdentical = (block1, block2) => {
  if (block1.data.chain_id !== block2.data.chain_id) return false;
  if (block1.height !== block2.height) return false;
  return block1.hash === block2.hash;
};

const isReverted = (block, parentBlock) => {
  if (+block.height - 1 !== +parentBlock.height) return true;
  return block.parent_hash !== parentBlock.hash;
};

export {
  isIdentical,
  isReverted,
};
