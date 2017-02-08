const express = require('express');
const path = require('path');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const passport = require('passport');
const jwt = require('jwt-simple');
const models = require('../models');
const request = require('superagent');
const winston = require('winston');
const validator = require('validator');
const alertConfig = require('./alertsConfig');
const bcrypt = require('bcryptjs');

//classes
const Restaurant = require('../class/restaurant');
const forbiddenWords = require('./forbiddenWords');

/**
 Get single restaurant
 * @api {get} /api/restaurants/:login Get Restaurant
 * @apiName 03_GetRestaurant
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Accept application/json
 *
 * @apiParam login Restaurant unique LOGIN.
 *
 * @apiSuccess {String} rest_name Name of the Restaurant.
 * @apiSuccess {String} login Login of the Restaurant.
 * @apiSuccess {String} address  Address of the Restaurant.
 * @apiSuccess {Boolean} avatar=false  Checks if avatar of the Restaurant is set.
 * @apiSuccess {String} description  Description of the Restaurant.
 * @apiSuccess {Array} foods Foods of the Restaurant.
 * @apiSuccess {Int} likes Likes of the Restaurant.
 * @apiSuccess {Int} dislikes Dislikes of the Restaurant.
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *     {
 *        "rest_name": "Fat Bob Burger",
 *        "login": "fatbob",
 *        "address": "Kramarska 21, Poznan",
 *        "avatar": false,
 *        "description": "super opis fat boba",
 *        "foods": [
 *          {
 *           "uuid": "x7dafa30-9b83-11e6-84da-212055eb89db",
 *           "likes": 53,
 *           "dislikes": 23
 *          }
 *        ],
 *        "likes": 53,
 *        "dislikes": 23
 *     }
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
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
      res.setHeader('Cache-Control', 'no-cache');
      var newRestaurant = new Restaurant(data.rest_name)
        .login(data.login)
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

/**
 Update restaurant
 * @api {put} /api/restaurants Update Restaurant
 * @apiName 04_UpdateRestaurant
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 * @apiHeader Authorization Bearer token
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} rest_name Name of the Restaurant.
 * @apiParam {String} address  Address of the Restaurant.
 * @apiParam {String} description  Description of the Restaurant.
 * @apiParam {String} avatar Avatar of the Restaurant (base64 format).
 * @apiParamExample {json} Input
 *    {
 *      "login": "fatbob",
 *      "rest_name": "Fat Bob Burger",
 *      "address": "Kramarska 21, Poznan",
 *      "description": "super opis fat boba",
 *      "avatar": "data:image/jpeg;base64,/9j/4AAQS...."
 *    }
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
router.put('/', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  req.accepts('application/json');
  var _login = req.user.dataValues.login;
  var update = {};

  if (req.body.rest_name !== undefined && req.body.rest_name !== null) {
    if (!validator.isAscii(req.body.rest_name)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body.rest_name, {min: 5, max: 25})) {
      return res.status(400).send(alertConfig.updateRestaurant.rest_name.length);
    }
    Object.assign(update, {rest_name: req.body.rest_name});
  }
  if (req.body.address !== undefined && req.body.address !== null) {
    if (!validator.isAscii(req.body.address)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body.address, {min: 5, max: 100})) {
      return res.status(400).send(alertConfig.updateRestaurant.address.length);
    }
    Object.assign(update, {address: req.body.address});
  }
  if (req.body.description !== undefined && req.body.description !== null) {
    if (!validator.isAscii(req.body.description)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body.description, {min: 5, max: 200})) {
      return res.status(400).send(alertConfig.updateRestaurant.description.length);
    }
    Object.assign(update, {description: req.body.description});
  }
  if (req.body.avatar !== undefined && req.body.avatar !== null) {
    if (!(new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(req.body.avatar))) {
      return res.status(400).send(alertConfig.updateRestaurant.avatar.extension);
    } else if (Buffer.byteLength(req.body.avatar, 'utf8') > 2097152) {
      return res.status(400).send(alertConfig.updateRestaurant.avatar.size);
    }
    var token = jwt.encode('authorized', 'tokensecret');
    request
      .post('http://nodestore:3500/api/images')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({
        type: 'avatar',
        name: _login,
        photo: req.body.avatar
      })
      .end((err) => {
        if (err) {
          res.status(404).send();
        } else {
          winston.log('info', 'Avatar sent to nodestore.');
          Object.assign(update, {avatar: true});
          models.Restaurant.update(update, {
            where: {
              login: _login
            }
          })
            .then(function() {
              res.status(200).send();
            })
            .catch(function(error) {
              res.status(404).send();
            });
        }
      });
  } else {
    models.Restaurant.update(update, {
      where: {
        login: _login
      }
    })
      .then(function() {
        res.status(200).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });
  }
});

/**
 Change password
 * @api {put} /api/restaurants/change-password Change Password
 * @apiName 05_ChangePassword
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 * @apiHeader Authorization Bearer token
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} oldPassword Old password of the Restaurant.
 * @apiParam {String} newPassword  New password of the Restaurant.
 * @apiParam {String} newPassword2  Again new password of the Restaurant.
 * @apiParamExample {json} Input
 *    {
 *      "oldPassword": "fatbob",
 *      "newPassword": "newpass",
 *      "newPassword2": "newpass"
 *    }
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
router.put('/change-password', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  const _login = req.user.dataValues.login;
  req.accepts('application/json');
  models.Restaurant.findOne({
    where: {
      login: _login
    }
  }).then(function(restaurant) {
    if (!restaurant.validPassword(req.body.oldPassword)) {
      return res.status(400).send(alertConfig.changePassword.match);
    } else if (!validator.equals(req.body.newPassword, req.body.newPassword2)) {
      return res.status(400).send(alertConfig.changePassword.different);
    } else if (!validator.isLength(req.body.newPassword, {min: 5, max: undefined})) {
      return res.status(400).send(alertConfig.changePassword.length);
    } else if (validator.isEmpty(req.body.oldPassword) ||
      validator.isEmpty(req.body.newPassword) ||
      validator.isEmpty(req.body.newPassword2)) {
      return res.status(400).send(alertConfig.changePassword.empty);
    }
    var newPassword = req.body.newPassword;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newPassword, salt, function(err, hash) {
        newPassword = hash;
        models.Restaurant.update(
          {
            password: newPassword
          },
          {
            where: {
              'login': _login
            }
          }
          )
          .then(function() {
            res.status(200).send();
          })
          .catch(function(error) {
            res.status(404).send();
          });
      });
    });
  });
});

/**
 Login
 * @api {post} /api/restaurants/token Login
 * @apiName 02_Login
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * @apiHeader  Accept application/json
 *
 * @apiParam username Username of the Restaurant.
 * @apiParam password Password of the Restaurant.
 *
 * @apiParamExample {x-www-form-urlencoded} Input
 *    {
 *      "username": "fatbob",
 *      "password": "fatbob"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN0X25hbWUiOiJGYXQgQm9iIEJ1cmdlciIsImlkIjoyLCJhZGRyZXNzIjoiS3JhbWFyc2thIDIxLCBQb3puYW4iLCJsb2dpbiI6ImZhdGJvYiIsImF2YXRhciI6dHJ1ZSwiZGVzY3JpcHRpb24iOiJzdXBlciBvcGlzIGZhdCBib2JhIn0._4pN-LCt_RZqkx2Z1QLIV-t6MdEtT0Rl9sAFWza3_n0"
 *    }
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 * @apiErrorExample Bad request
 *    HTTP/1.1 400 Bad request
 */
router.post('/token', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.status(404).send(); }
    if (!user) {
      res.status(400).send();
    }
    var tmpUser = new Restaurant(user.rest_name)
    .id(user.id)
    .address(user.address)
    .login(user.login)
    .avatar(user.avatar)
    .description(user.description);
    var token = jwt.encode(tmpUser, config.tokenSecret);
    res.json({ token: token });
  })(req, res, next);
});

/**
 Register
 * @api {post} /api/restaurants Register
 * @apiName 01_Register
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader Content-Type application/json
 *
 * @apiParam username Username of the Restaurant.
 * @apiParam login Login of the Restaurant.
 * @apiParam passwordOne Password of the Restaurant.
 * @apiParam passwordTwo Password of the Restaurant again.
 *
 * @apiParamExample {json} Input
 *    {
 *      "username": "Test 1",
 *      "login": "test1",
 *      "passwordOne": "test1",
 *      "passwordTwo": "test1"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *
 * @apiErrorExample Bad request
 *    HTTP/1.1 400 Bad request
 *    {
 *      "Login already in use"
 *    }
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
router.post('/', function(req, res, next) {
  req.accepts('application/json');
  if (req.body.username == undefined ||
    req.body.login == undefined ||
    req.body.passwordOne == undefined ||
    req.body.passwordTwo == undefined) {
    return res.status(400).send();
  }

  if (!validator.isLength(req.body.username, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.username.length);
  } else if (!validator.isLength(req.body.login, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.login.length);
  } else if (!validator.isLength(req.body.passwordOne, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.password.length);
  } else if (!validator.isAscii(req.body.username)) {
    return res.status(400).send(alertConfig.register.username.ascii);
  } else if (!validator.isAlphanumeric(req.body.login)) {
    return res.status(400).send(alertConfig.register.login.ascii);
  } else if (!validator.isAlphanumeric(req.body.passwordOne)) {
    return res.status(400).send(alertConfig.register.password.ascii);
  } else if (!validator.equals(req.body.passwordOne, req.body.passwordTwo)) {
    return res.status(400).send(alertConfig.register.match);
  } else if (validator.isEmpty(req.body.username) ||
    validator.isEmpty(req.body.login) ||
    validator.isEmpty(req.body.passwordOne) ||
    validator.isEmpty(req.body.passwordTwo)) {
    return res.status(400).send(alertConfig.register.empty);
  }

  forbiddenWords.map((elem) => {
    if (validator.contains(req.body.login, elem)) {
      return res.status(400).send(alertConfig.register.login.forbidden);
    } else if (validator.contains(req.body.username, elem)) {
      return res.status(400).send(alertConfig.register.username.forbidden);
    }
  });

  models.Restaurant.create({
    rest_name: req.body.username,
    address: 'No address.',
    login: req.body.login,
    password: req.body.passwordOne,
    avatar: false,
    description: 'No description.'
  }, {})
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      if (validator.equals(error.message, alertConfig.register.use)) {
        return res.status(400).send(error.message);
      }
      res.status(404).send();
    });
});

// Endpoint created just for testing purpose. There is no DELETE functionality in the project
// Not included in documentation for the same reason
router.delete('/', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  models.Restaurant.destroy({
    where: {
      login: req.user.dataValues.login
    }
  }).then(function(rowDeleted) {
    if (rowDeleted === 1) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }, function(err) {
    res.status(404).send();
  });
});
module.exports = router;
