const {sequelize} = require('./db');
const {Car} = require('./');
const {cars} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Car.bulkCreate(cars);
};

module.exports = seed;
