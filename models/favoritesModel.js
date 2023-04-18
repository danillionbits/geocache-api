const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./usersModel');
const Cache = require('./cachesModel');

const Favorite = sequelize.define('favorites', {
  favoriteID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cacheID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Favorite.belongsTo(User, { foreignKey: 'userID' });
Favorite.belongsTo(Cache, { foreignKey: 'cacheID' });

module.exports = Favorite;