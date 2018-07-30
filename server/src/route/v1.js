import { Router } from 'express';

import account from '../account/route';
import block from '../block/route';
import transaction from '../transaction/route';

export default Router()
  .use('/accounts', account)
  .use('/blocks', block)
  .use('/transactions', transaction)
  .use((req, res) => res.status(404).send('Not Found'));
