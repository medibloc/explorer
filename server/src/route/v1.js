import { Router } from 'express';

import account from '../account/route';
import block from '../block/route';
import candidate from '../candidate/route';
import { subscribe } from '../blockchain/controller';
import info from '../infoController';
import transaction from '../transaction/route';
import wrap from '../utils/controller';

export default Router()
  .use('/accounts', account)
  .use('/blocks', block)
  .use('/candidates', candidate)
  .use('/info', wrap(info))
  .use('/transactions', transaction)
  .use('/subscribe', wrap(subscribe))
  .use((req, res) => res.status(404).send('Not Found'));
