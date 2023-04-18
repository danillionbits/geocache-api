const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./usersModel');

const Message = sequelize.define('messages', {
  messageID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  senderID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recipientID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Message.belongsTo(User, { foreignKey: 'senderID' })

module.exports = Message;
