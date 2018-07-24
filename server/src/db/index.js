import Sequelize from 'sequelize';

import config from '../../config';

const USERNAME = process.env.EXPLORER_DB_USERNAME;
const PASSWORD = process.env.EXPLORER_DB_PASSWORD;

const connect = ({
  database, dialect, host, password, user,
}) => {
  const sequelize = new Sequelize(database, user, password, {
    dialect,
    host,
    logging: false,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 10,
      min: 0,
    },
  });

  sequelize.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
      process.exit(1);
    });
  return sequelize;
};

const conn = connect({
  ...config.db,
  user: USERNAME,
  password: PASSWORD,
});

export default conn;

export const close = () => conn.close();
