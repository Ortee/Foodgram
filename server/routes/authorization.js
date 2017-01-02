const express = require('express');
const path = require('path');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const passport = require('passport');
const jwt = require('jwt-simple');
const models = require('../models');
const validator = require('validator');
const alertConfig = require('./alertsConfig');

var Restaurant = require('../class/restaurant');
const forbiddenWords = require('./forbiddenWords');

/**
 Login
 * @api {post} /api/login Login
 * @apiName 02_Login
 * @apiGroup Authorization
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
router.post('/login', function(req, res, next) {
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
 * @api {post} /api/register Register
 * @apiName 01_Register
 * @apiGroup Authorization
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
 *      "username": "fatbob",
 *      "login": "Fat Bob Burger"
 *      "passwordOne": "fatbob",
 *      "passwordTwo": "fatbob"
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
router.post('/register', function(req, res, next) {
  req.accepts('application/json');

  if (!validator.isLength(req.body[0].username, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.username.length);
  } else if (!validator.isLength(req.body[0].login, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.login.length);
  } else if (!validator.isLength(req.body[0].passwordOne, {min: 5, max: undefined})) {
    return res.status(400).send(alertConfig.register.password.length);
  } else if (!validator.isAscii(req.body[0].username)) {
    return res.status(400).send(alertConfig.register.username.ascii);
  } else if (!validator.isAlphanumeric(req.body[0].login)) {
    return res.status(400).send(alertConfig.register.login.ascii);
  } else if (!validator.isAlphanumeric(req.body[0].passwordOne)) {
    return res.status(400).send(alertConfig.register.password.ascii);
  } else if (!validator.equals(req.body[0].passwordOne, req.body[0].passwordTwo)) {
    return res.status(400).send(alertConfig.register.match);
  } else if (validator.isEmpty(req.body[0].username) ||
    validator.isEmpty(req.body[0].login) ||
    validator.isEmpty(req.body[0].passwordOne) ||
    validator.isEmpty(req.body[0].passwordTwo)) {
    return res.status(400).send(alertConfig.register.empty);
  }

  forbiddenWords.map((elem) => {
    if (validator.contains(req.body[0].login, elem)) {
      return res.status(400).send(alertConfig.register.login.forbidden);
    } else if (validator.contains(req.body[0].username, elem)) {
      return res.status(400).send(alertConfig.register.username.forbidden);
    }
  });

  models.Restaurant.create({
    rest_name: req.body[0].username,
    address: 'No address.',
    login: req.body[0].login,
    password: req.body[0].passwordOne,
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

module.exports = router;
