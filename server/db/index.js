import Sequelize from 'sequelize';

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

const conn = connect({});

export default conn;

export const close = () => conn.close();
