import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

const value = { defaultValue: '0', type: Sequelize.DECIMAL(36, 0) };
export default db.define('candidates', {
  address: { allowNull: false, type: Sequelize.STRING, unique: true },
  consensusPubKey: { type: Sequelize.STRING, unique: true },
  jailed: { type: Sequelize.BOOLEAN, defaultValue: false },

  data,
  id,
  votes: { ...value },
});
