const {Sequelize, sequelize} = require('./db');

const Car = sequelize.define('car', {
  category: Sequelize.STRING,
  year: Sequelize.INTEGER,
  make: Sequelize.STRING,
  model: Sequelize.STRING,
  color: Sequelize.STRING,
  image: Sequelize.STRING,
  drivetrain: Sequelize.STRING,
  mpg: Sequelize.STRING,
  fuelType: Sequelize.STRING,
  transmission: Sequelize.STRING,
  engine: Sequelize.STRING,
  badge: Sequelize.STRING
});

module.exports = { Car };
