import path from 'path';

const endpoint = 'localhost';
const config = {
  BLOCKCHAIN: {
    URL: 'http://localhost:9921',
    TENDERMINT_URL: {
      http: `http://${endpoint}:26657`,
      ws: `ws://${endpoint}:26657/websocket`,
    },
    SERVER_URL: {
      http: `http://${endpoint}:1317`,
    },
    GENESIS_ACCOUNT: '000000000000000000000000000000000000000000000000000000000000000000',
    TOPICS: {
      newTailBlock: {},
    },
    MEM_FIELDS: {
      notBondedTokens: null,
      bondedTokens: null,
      totalSupply: null,
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
