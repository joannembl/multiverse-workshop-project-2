const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const { User } = require('./db');
const { Car } = require('./db');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
  try {
    res.send(`
      <h1>Welcome to Convenient Auto Report!</h1>
      <p>Cars are available at <a href="/cars">/cars</a></p>
      <p>Create a new car at <b><code>POST /cars</code></b> and delete one at <b><code>DELETE /cars/:id</code></b></p>
      <p>Log in via POST /login or register via POST /register</p>
    `);
  } catch (error) {
    console.error(error);
    next(error)
  }
});

const jwt = require('jsonwebtoken');

// get JWT_SECRET from .env
const { JWT_SECRET } = process.env;

// Verifies token with jwt.verify and sets req.user
// TODO - Create authentication middleware
const setUser = async (req, res, next) => {
  try {
    const auth = req.header('Authorization');
     if(!auth) {
      next();
    } else {
      const [, token] = auth.split(' ');
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// POST /register
// OPTIONAL - takes req.body of {username, password} and creates a new user with the hashed password
app.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashed
    });
    // NOT NEEDED
    const token = jwt.sign({
      id: newUser.id,
      username: newUser.username
    }, JWT_SECRET);
    res.send({message: 'success', token});
  } catch(err) {
    console.error(err);
    next(err);
  }
});

// POST /login
// OPTIONAL - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
app.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
   const matching = await bcrypt.compare(password, user.password);
    if(matching) {
      const {id, username} = user;
      const token = jwt.sign({
        id,
        username
      }, JWT_SECRET);
      res.send({message: 'success', token});
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /cars/:id
// TODO - takes an id and returns the car with that id
app.get('/cars/:id', setUser, async (req, res, next) => {
  const car = await Car.findByPk(req.params.id);
  if(!req.user) {
    res.sendStatus(401);
  } else if(req.user.id !== car.userId) {
    res.status(401).send({ message: 'User not authorized to view car'});
  } else if(req.user.id === car.userId) {
    res.status(200).send({
      category: car.category,
      year: car.year,
      make: car.make,
      model: car.model,
      color: car.color,
      image: car.image,
      drivetrain: car.drivetrain,
      mpg: car.mpg,
      fuelType: car.fuelType,
      transmission: car.transmission,
      engine: car.engine,
      badge: car.badge,
    });
  }
})

// GET /cars
// TODO - takes a logged in user and returns all cars
app.get('/cars', setUser, async (req, res, next) => {
  const cars = await Car.findAll();
  if(!req.user) {
    res.sendStatus(401);
  } else if (req.user.role !== 'admin') {
    res.status(400).send({ message: 'User not authorized to access' })
  } else if (req.user.role === 'admin') {
    res.status(200).send({
      cars
    });
  }
})

// GET /users
// TODO - takes a logged in user and returns all cars
app.get('/users', setUser, async (req, res, next) => {
  const users = await User.findAll();
  if(!req.user) {
    res.sendStatus(401);
  } else if (req.user.role !== 'admin') {
    res.status(400).send({ message: 'User not authorized to access' })
  } else if (req.user.role === 'admin') {
    res.status(200).send({
      users
    });
  }
})

// POST /cars
// TODO - takes req.body of {category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge} 
// and creates a new car with the given category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge
app.post('/cars', setUser, async (req, res, next) => {
  if(!req.user) {
    res.sendStatus(401);
  } else {
    const {category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge} = req.body;
    const newCar = await Car.create({category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge, userId: req.user.id});
    res.status(201).send({newCar});
  }
});

// POST /cars/:id
// TODO - takes req.body of {category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge} 
// and updates car with the given category, year, make, model, color, image, drivetrain, mpg, fuelType, transmission, engine, badge
app.post('/cars/:id', setUser, async (req, res, next) => {
  const carToUpdate = await Car.findByPk(req.params.id);

  if(!req.user) {
    res.sendStatus(401);
    return;
  } else if (carToUpdate.userId !== req.user.id && req.user.role !== 'admin') {
    res.status(401).send({
      message: 'User does not have access to update'
    });
    return;
  }
  
  if (!carToUpdate) {
    res.status(400).send({
      message: 'Car not found',
    })
    return;
  } else if (carToUpdate.userId === req.user.id) {
    const updatedCar = await carToUpdate.update(req.body)
    res.status(200).send({
      updatedCar,
      message: "Car successfully updated",
    });
    return;
  }
});

// DELETE /cars/:id
// TODO - takes an id and deletes the car with that id
app.delete('/cars/:id', setUser, async (req, res, next) => {
  const car = await Car.findByPk(req.params.id);
  if(!req.user) {
    res.sendStatus(401);
    return;
  } else if (car.userId !== req.user.id && req.user.role !== 'admin') {
    res.status(401).send({
      message: 'User does not have access to delete'
    });
    return;
  } else if (car.userId === req.user.id) {
    await car.destroy();
    res.status(200).send({message: 'Successfully Deleted!'});
    return;
  }
})

// error handling middleware, so failed tests receive them
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message});
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
