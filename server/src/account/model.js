import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

const value = { defaultValue: '0', type: Sequelize.DECIMAL(36, 0) };
export default db.define('accounts', {
  address: { allowNull: false, type: Sequelize.STRING, unique: true },
  balance: { ...value },
  data, // last data received from node(BP)
  id,
  totalAmount: { ...value },
  vesting: { ...value },
});
