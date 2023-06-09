const {sequelize} = require('./db');
const {User} = require('./');
const {Car} = require('./');
const {users, cars} = require('./seedData');
const bcrypt = require('bcrypt');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  const usersWithHashedPasswords = [];
    const SALT_COUNT = 10;
    for(const i in users){
      users[i].password = await bcrypt.hash(users[i].password, 10);
      usersWithHashedPasswords.push(users[i]);
    }
  await User.bulkCreate(usersWithHashedPasswords);
  await Car.bulkCreate(cars);
};

module.exports = seed;
