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

// Get single restaurant
router.get('/:login', function(req, res, next) {
  var _login = req.params.login;
  models.Restaurant.findOne({
    where: {
      login: _login
    },
    include: [
      {
        model: models.Food,
        attributes: ['uuid', 'photo', 'likes', 'dislikes']
      }
    ],
    order: [
      [ { model: models.Food }, 'updated_at', 'DESC' ]
    ]
  })
    .then(function(data) {
      var rate = {
        likes: 0,
        dislikes: 0
      };
      data.Food.map((elem) => {
        Object.assign(rate, {likes: rate.likes + elem.likes});
        Object.assign(rate, {dislikes: rate.dislikes + elem.dislikes});
      });
      res.setHeader('Content-Type', 'application/json');
      var newRestaurant = new Restaurant(data.rest_name)
        .address(data.address)
        .avatar(data.avatar)
        .description(data.description)
        .foods(data.Food)
        .likes(rate.likes)
        .dislikes(rate.dislikes);
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
