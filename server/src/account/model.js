import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

export default db.define('accounts', {
  address: { allowNull: false, type: Sequelize.STRING, unique: true },
  balance: { defaultValue: '0', type: Sequelize.DECIMAL(24, 8) },
  data, // last data received from node(BP)
  id,
});
