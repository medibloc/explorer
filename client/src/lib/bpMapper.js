const bpMapper = (bp) => {
  let url = null;
  let alias = null;
  if (bp.data && bp.data.description) {
    url = bp.data.description.website;
    alias = bp.data.description.moniker;
  }

  return {
    url,
    Account: bp.address,
    Alias: alias,
    votes: bp.votes,
  };
};

export default bpMapper;
