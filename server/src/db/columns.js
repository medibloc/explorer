import { singular } from 'pluralize';
import Sequelize from 'sequelize';

export const data = {
  type: Sequelize.TEXT('long'),
  get: function () {
    return JSON.parse(this.dataValues.data);
  },
  set: function (value) {
    this.setDataValue('data', JSON.stringify(value));
  },
};
export const id = { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true };
export const refer = (parent, options = {}) => ({
  [`${singular(parent.name)}Id`]: {
    ...options,
    references: {
      key: 'id',
      model: parent,
    },
    type: Sequelize.INTEGER,
  },
});
