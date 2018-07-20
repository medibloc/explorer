import { id, refer } from '../db/columns';
import db from '../db';

import Block from '../block/model';

export default db.define('tranasctions', {
  id,
  ...refer(Block),
});
