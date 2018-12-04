const isReverted = (block, parentBlock) => {
  if (+block.height + 1 !== +parentBlock.height) return true;
  return block.parent_hash !== parentBlock.hash;
};

export default {
  isReverted,
};
