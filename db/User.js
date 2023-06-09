const {Sequelize, sequelize} = require('./db');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
});

module.exports = { User };
