const bpMapper = bp => ({
  Account: bp.address,
  votes: bp.vote_power,
  Alias: bp.alias,
});

export default bpMapper;
