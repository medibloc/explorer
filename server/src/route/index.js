import { Router } from 'express';
import v1 from './v1';

export default Router().use('/api/v1', v1);
