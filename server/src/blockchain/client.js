import axios from 'axios/index';

import config from '../../config';

const { url } = config.blockchain;

export const getCandidates = () => axios({ // eslint-disable-line import/prefer-default-export
  method: 'get',
  url: `${url}/v1/candidates`,
});
