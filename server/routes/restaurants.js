var express = require('express');
var path = require('path');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = pgp(process.env[config.use_env_variable]);

//classes
var Restaurant = require('../class/restaurant');

function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset()
    * 60000) + (3600000 * 2));
}

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

// Update restaurant rest_name
router.put('/rest_name', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].login;
  db.query('UPDATE "Restaurant" SET "rest_name" = $2, "updated_at" = $3 WHERE "login" = $1',
    [
      _id,
      req.body[0].rest_name,
      getTimestamp()
    ])
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

// Update restaurant address
router.put('/address', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].login;
  db.query('UPDATE "Restaurant" SET "address" = $2, "updated_at" = $3 WHERE "login" = $1',
    [
      _id,
      req.body[0].address,
      getTimestamp()
    ])
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

// Update restaurant avatar
router.put('/avatar', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].login;
  db.query('UPDATE "Restaurant" SET "avatar" = $2, "updated_at" = $3 WHERE "login" = $1',
    [
      _id,
      req.body[0].avatar,
      getTimestamp()
    ])
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

// Update restaurant description
router.put('/description', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].login;
  db.query('UPDATE "Restaurant" SET "description" = $2, "updated_at" = $3 WHERE "login" = $1',
    [
      _id,
      req.body[0].description,
      getTimestamp()
    ])
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

module.exports = router;
