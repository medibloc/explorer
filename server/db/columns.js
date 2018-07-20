import { singular } from 'pluralize';
import Sequelize from 'sequelize';

export const id = { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true };
export const refer = parent => ({
  [`${singular(parent.name)}Id`]: {
    references: {
      key: 'id',
      model: parent,
    },
    type: Sequelize.INTEGER,
  },
});
