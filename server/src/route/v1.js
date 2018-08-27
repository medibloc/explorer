import { Router } from 'express';

import account from '../account/route';
import block from '../block/route';
import info from '../infoController';
import transaction from '../transaction/route';
import wrap from '../utils/controller';

export default Router()
  .use('/accounts', account)
  .use('/blocks', block)
  .use('/info', wrap(info))
  .use('/transactions', transaction)
  .use((req, res) => res.status(404).send('Not Found'));
