const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('convenientAutoReport', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize,
    Sequelize
};