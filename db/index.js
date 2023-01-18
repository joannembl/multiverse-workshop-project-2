const {Car} = require('./Car');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

Car.belongsTo(User, {foreignKey: 'ownerId'}); // Car table, there will be an ownerId <- FK
User.hasMany(Car);

module.exports = {
    Car,
    User,
    sequelize,
    Sequelize
};
