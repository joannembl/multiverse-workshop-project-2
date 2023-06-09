const {Car} = require('./Car');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

User.hasMany(Car);
Car.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' } ); 

module.exports = {
    Car,
    User,
    sequelize,
    Sequelize
};
