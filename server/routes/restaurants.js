var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = pgp(process.env[config.use_env_variable]);

//classes
var Restaurant = require('../class/restaurant');


function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000*2));
}

// Get all restaurants (tmp request for development)
router.get('/', function (req, res, next) {
  db.any(
      'SELECT id, rest_name, address, login, password, avatar, description, created_at, updated_at FROM "Restaurant" ORDER BY created_at DESC')
      .then(function (data) {
        res.setHeader('Content-Type', 'application/json');
        Restaurant = data.map((elem) => new Restaurant(
          elem.id,
          elem.rest_name,
          elem.address,
          elem.login,
          elem.password,
          elem.avatar,
          elem.description,
          elem.created_at,
          elem.updated_at));
          res.json(Restaurant);
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

module.exports = router;
