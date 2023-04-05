const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Image = sequelize.define('images', {
  imageID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cacheID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Image;
