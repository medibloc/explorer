import Sequelize from 'sequelize';

import db from '../db';
import { id } from '../db/columns';

export default db.define('blocks', {
  height: { type: Sequelize.INTEGER },
  id,
});
