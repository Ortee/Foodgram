const express = require('express');
const path = require('path');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const passport = require('passport');
const jwt = require('jwt-simple');
const models = require('../models');
const validator = require('validator');

var Restaurant = require('../class/restaurant');
const forbiddenWords = require('./forbiddenWords');

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

router.post('/register', function(req, res, next) {
  req.accepts('application/json');

  if (!validator.isLength(req.body[0].username, {min: 5, max: undefined})) {
    return res.status(400).send('Username is too short (min: 5 letters).');
  } else if (!validator.isLength(req.body[0].login, {min: 5, max: undefined})) {
    return res.status(400).send('Login is too short (min: 5 letters).');
  } else if (!validator.isLength(req.body[0].passwordOne, {min: 5, max: undefined})) {
    return res.status(400).send('Password is too short (min: 5 letters).');
  } else if (!validator.isAlphanumeric(req.body[0].username)) {
    return res.status(400).send('Username can contain only letters and numbers.');
  } else if (!validator.isAlphanumeric(req.body[0].login)) {
    return res.status(400).send('Login can contain only letters and numbers.');
  } else if (!validator.isAlphanumeric(req.body[0].passwordOne)) {
    return res.status(400).send('Password can contain only letters and numbers.');
  } else if (!validator.equals(req.body[0].passwordOne, req.body[0].passwordTwo)) {
    return res.status(400).send('The two passwords do not match!');
  } else if (validator.isEmpty(req.body[0].username) ||
    validator.isEmpty(req.body[0].login) ||
    validator.isEmpty(req.body[0].passwordOne) ||
    validator.isEmpty(req.body[0].passwordTwo)) {
    return res.status(400).send('Some of the fields are empty');
  }

  forbiddenWords.map((elem) => {
    if (validator.contains(req.body[0].login, elem)) {
      return res.status(400).send('Login contains forbidden characters.');
    } else if (validator.contains(req.body[0].username, elem)) {
      return res.status(400).send('Username contains forbidden characters.');
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
      res.status(200).send();
    })
    .catch(function(error) {
      if (validator.equals(error.message, 'Login already in use')) {
        return res.status(400).send(error.message);
      }
      res.status(404).send();
    });
});

// tmp route for bearer strategy test
router.get('/profile', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var user = req.user;
    res.send(user);
  });

module.exports = router;
