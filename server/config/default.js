import path from 'path';

const endpoint = '10.0.101.112';
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
    COINMARKETCAP_URL: 'https://api.coinmarketcap.com/v2/ticker/2845/',
    COINGECKO_URL: 'https://api.coingecko.com/api/v3/coins/medibloc?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
    GENESIS_ACCOUNT: '000000000000000000000000000000000000000000000000000000000000000000',
    TOPICS: {
      newTailBlock: {},
    },
    MEM_FIELDS: {
      notBondedTokens: null,
      bondedTokens: null,
      totalSupply: null,
      price: null,
    },
  },
  DB: {
    database: 'panacea-2',
    dialect: 'mysql',
    host: 'localhost:3306',
  },
  REQUEST: {
    REQUEST_STEP: 10,
  },
  SERVER: {
    PORT: 8080,
    SECRET: null,
    PASSWORD_HASH: null,
    HASH_ALG: 'sha256',
  },
  LOGGER: {
    DIR: path.join(__dirname, '../logs'),
  },
};

export default config;
