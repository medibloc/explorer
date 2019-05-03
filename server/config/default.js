import path from 'path';

const config = {
  BLOCKCHAIN: {
    URL: 'http://localhost:9921',
    GENESIS_ACCOUNT: '000000000000000000000000000000000000000000000000000000000000000000',
    TOPICS: {
      'chain.newTailBlock': {},
    },
  },
  DB: {
    database: 'medi_explorer',
    dialect: 'mysql',
    host: 'localhost',
  },
  REQUEST: {
    REQUEST_STEP: 10,
  },
  SERVER: {
    PORT: 3000,
    SECRET: null,
    PASSWORD_HASH: null,
    HASH_ALG: 'sha256',
  },
  LOGGER: {
    DIR: path.join(__dirname, '../logs'),
  },
};

export default config;
