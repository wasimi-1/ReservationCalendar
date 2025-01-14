const { DataTypes } = require("sequelize");
const sequelize = require('../db');

const Event = sequelize.define('event', {
  Identifier: {
    type: DataTypes.INTEGER,
    autoincrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Event;
