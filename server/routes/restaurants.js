var express = require('express');
var path = require('path');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = pgp(process.env[config.use_env_variable]);
const models = require('../models');

//classes
var Restaurant = require('../class/restaurant');

// Get all restaurants
router.get('/', function(req, res, next) {
  db.any(
    'SELECT id, rest_name, address, login, password, avatar, description, created_at, updated_at FROM "Restaurant" ORDER BY created_at DESC')
    .then(function(data) {
      res.setHeader('Content-Type', 'application/json');
      var tmpRestaurant = data.map((elem) => new Restaurant(
        0,
        elem.rest_name,
        elem.address,
        0,
        0,
        elem.avatar,
        elem.description,
        0,
        0));
      res.json(tmpRestaurant);
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

// Get single restaurant
router.get('/:login', function(req, res, next) {
  var _login = req.params.login;
  models.Restaurant.findOne({
    where: {
      login: _login
    },
    include: [{ model: models.Food }]
  })
    .then(function(data) {
      res.setHeader('Content-Type', 'application/json');
      var newRestaurant = new Restaurant(
        0,
        data.rest_name,
        data.address,
        0,
        0,
        data.avatar,
        data.description,
        data.Food
      );
      res.json(newRestaurant);
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

// Update restaurant
router.put('/update', function(req, res, next) {
  req.accepts('application/json');
  var _login = req.body[0].login;
  var update = {};
  if (req.body[0].rest_name !== null) Object.assign(update, {rest_name: req.body[0].rest_name});
  if (req.body[0].address !== null) Object.assign(update, {address: req.body[0].address});
  if (req.body[0].avatar !== null) Object.assign(update, {avatar: req.body[0].avatar});
  if (req.body[0].description !== null) Object.assign(update, {description: req.body[0].description});
  models.Restaurant.update(update, {
    where: {
      login: _login
    }
  })
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

module.exports = router;
