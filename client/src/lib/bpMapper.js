const bpMapper = bp => ({
  Account: bp.address,
  votes: bp.vote_power,
});

export default bpMapper;
