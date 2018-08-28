import db from '../db';
import { data, id, refer } from '../db/columns';

import Account from '../account/model';
import Block from '../block/model';
import Transaction from '../transaction/model';

export default db.define('accountLogs', {
  id,
  data,
  ...refer(Account),
  ...refer(Block),
  ...refer(Transaction),
}, {
  // 2018. 08. 03. [heekyu] there is tx whose from == to
  /*
  indexes: [
    { fields: ['accountId', 'transactionId'], unique: true },
  ],
  */
});
