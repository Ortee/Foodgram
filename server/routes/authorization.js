const express = require('express');
const path = require('path');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const passport = require('passport');
const jwt = require('jwt-simple');
const models = require('../models');

//classes
var Restaurant = require('../class/restaurant');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.status(404).send(); }
    if (!user) {
      res.status(400).send(info);
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
  models.Restaurant.create({
    rest_name: req.body[0].username,
    address: 'No address.',
    login: req.body[0].login,
    password: req.body[0].password,
    avatar: false,
    description: 'No description.'
  }, {})
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
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
