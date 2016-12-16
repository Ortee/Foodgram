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


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', session: false }),
  function(req, res) {
    var user = new Restaurant(req.user.rest_name)
    .id(req.user.id)
    .address(req.user.address)
    .login(req.user.login)
    .avatar(req.user.avatar)
    .description(req.user.description);
    var token = jwt.encode(user, config.tokenSecret);
    res.json({ token: token });
  });

router.post('/register', function(req, res, next) {
  req.accepts('application/json');
  models.Restaurant.create({
    rest_name: req.body[0].username,
    address: 'No address.',
    login: req.body[0].login,
    password: req.body[0].password,
    avatar: false,
    description: 'No description'
  }, {})
    .then(function() {
      console.log('POSZLO');
      res.status(201).send();
    })
    .catch(function(error) {
      console.log('ERROR: ', error);
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
