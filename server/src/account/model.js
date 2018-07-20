import db from '../db';
import { id } from '../db/columns';

export default db.define('accounts', {
  id,
});
