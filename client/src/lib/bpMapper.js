import { divider } from './bigNumCalculator';

const bpMapper = (bp) => {
  const tempAmount = divider(bp.collateral, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Collateral = `${tempAmount.join('.')} MED`;

  return {
    Collateral,
    url: bp.url,
    Account: bp.address,
    Alias: bp.alias,
    votes: bp.vote_power,
  };
};

export default bpMapper;
