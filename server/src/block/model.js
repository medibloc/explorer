import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

export default db.define('blocks', {
  data,
  hash: { allowNull: false, type: Sequelize.STRING, unique: true },
  height: { type: Sequelize.INTEGER },
  id,
}, {
  indexes: [
    {
      fields: ['hash', 'height', 'id'],
      unique: true,
    }
  ],
});
