const { Sequelize } = require('sequelize');

const DATABASE = process.env.MYSQL_DATABASE;
const USER = process.env.MYSQL_USER;
const PASS = process.env.MYSQL_PASS;
const HOST = process.env.MYSQL_HOST;
const PORT = process.env.MYSQL_PORT;

// Create a new instance of Sequelize
const sequelize = new Sequelize(DATABASE, USER, PASS, {
  host: HOST,
  dialect: 'mysql',
  port: PORT,
});

module.exports = sequelize;