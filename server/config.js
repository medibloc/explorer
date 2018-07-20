const defaultConfig = {
  port: 3001,
};

const conf = Object.assign({}, defaultConfig);
Object.keys(defaultConfig).forEach((key) => {
  const envConfig = process.env[`BLOCKCHAIN_EXPLORER_${key.toUpperCase()}`];
  if (envConfig) {
    conf[key] = envConfig;
  }
});

export default conf;
