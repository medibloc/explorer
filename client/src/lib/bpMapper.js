import { divider } from './bigNumCalculator';

const bpMapper = (bp) => {
  const tempAmount = divider(bp.collateral, [10 ** 12]).split('.');
  tempAmount[0] = tempAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const Collateral = `${tempAmount.join('.')} MED`;

  let url = null;
  if (bp.url) {
    url = bp.url.indexOf('https://') === 0 ? bp.url : `https://${bp.url}`;
  }

  return {
    Collateral,
    url,
    Account: bp.address,
    Alias: bp.alias,
    votes: bp.vote_power,
  };
};

export default bpMapper;
