var express = require('express');
var path = require('path');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = pgp(process.env[config.use_env_variable]);

//classes
var Restaurant = require('../class/restaurant');


// Get all restaurants
router.get('/', function(req, res, next) {
  console.log('leci');
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
  console.log('leci2');
  db.any(
    'SELECT id, rest_name, address, login, password, avatar, description, created_at, updated_at FROM "Restaurant" WHERE login = $1', _login)
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


module.exports = router;
