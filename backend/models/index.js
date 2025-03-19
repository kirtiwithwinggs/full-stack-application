const sequelize = require('../config/database');
const Item = require('./item');

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  Item,
};

module.exports = db;
