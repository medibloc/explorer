import Sequelize from 'sequelize';

import db from '../db';
import { data, id } from '../db/columns';

export default db.define('blocks', {
  data,
  height: { type: Sequelize.INTEGER },
  id,
});
