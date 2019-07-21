const isIdentical = (block1, block2) => {
  if (block1.chain_id !== block2.chain_id) return false;
  if (block1.height !== block2.height) return false;
  return block1.hash === block2.hash;
};

export {
  isIdentical, // eslint-disable-line
};
