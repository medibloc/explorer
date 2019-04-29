import { close } from './index';

import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';

const sync = () => [Account, Block, Transaction].reduce(
  (promise, model) => promise.then(() => model.sync({ alter: true })),
  Promise.resolve(),
).then(close);

export default sync;

if (require.main === module) {
  sync();
}
