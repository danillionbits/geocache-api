const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./userModel');
const Cache = require('./cacheModel');

const Log = sequelize.define('logs', {
  logID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  logType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logComment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
});

Log.belongsTo(User, { foreignKey: 'userID' });

module.exports = Log;
