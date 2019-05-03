import crypto from 'crypto';
import config from '../../config';

const { SERVER } = config;


export default async (req, res, next) => {
  const { password } = req.body;
  if (!password) throw new Error('password is required');

  const hash = crypto.createHmac(SERVER.HASH_ALG, SERVER.SECRET)
    .update(password)
    .digest('hex');
  if (hash !== SERVER.PASSWORD_HASH) {
    const err = new Error('wrong password');
    err.status = 401;
    throw err;
  }

  return next();
};
