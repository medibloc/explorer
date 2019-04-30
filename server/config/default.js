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
  },
};

export default config;
