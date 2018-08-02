import { merge } from 'lodash';

import defaultConfig from './default';
import test from './test';

const configs = {
  test,
};

export default merge({}, defaultConfig, configs[process.env.NODE_ENV] || {});
