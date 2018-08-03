import Sequelize from 'sequelize';

import { data, id, refer } from '../db/columns';
import db from '../db';

import Block from '../block/model';

export default db.define('transactions', {
  data,
  id,
  txHash: { type: Sequelize.STRING, unique: true },
  ...refer(Block),
});
