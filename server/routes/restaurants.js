const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
const request = require('superagent');
const winston = require('winston');

//classes
const Restaurant = require('../class/restaurant');

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
        attributes: ['uuid', 'likes', 'dislikes']
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
router.put('/update', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  req.accepts('application/json');
  var _login = req.body[0].login;
  var update = {};
  if (req.body[0].rest_name !== null) Object.assign(update, {rest_name: req.body[0].rest_name});
  if (req.body[0].address !== null) Object.assign(update, {address: req.body[0].address});
  if (req.body[0].description !== null) Object.assign(update, {description: req.body[0].description});
  if (req.body[0].avatar !== null) {
    request
      .post('http://nodestore:3500/api/upload-avatar')
      .set('Content-Type', 'application/json')
      .send([{
        login: req.body[0].login,
        avatar: req.body[0].avatar
      }])
      .end((err) => {
        if (err) {
          res.status(404).send();
        } else {
          winston.log('info', 'Avatar sent to nodestore.');
          Object.assign(update, {avatar: 'http://localhost:8000/api/images/avatar/' + req.body[0].login + '.png'});
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
        }
      });
  }
});

// Change password
router.put('/password', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  req.accepts('application/json');
  models.Restaurant.findOne({
    where: {
      login: req.body[0].login
    }
  }).then(function(restaurant) {
    if (restaurant.password == req.body[0].oldPassword && req.body[0].newPassword == req.body[0].newPassword2) {
      models.Restaurant.update(
        {
          password: req.body[0].newPassword
        },
        {
          where: {
            'login': req.body[0].login
          }
        }
        )
        .then(function() {
          res.status(201).send();
        })
        .catch(function(error) {
          res.status(404).send();
        });
    } else {
      res.status(404).send();
    }
  });
});

module.exports = router;
