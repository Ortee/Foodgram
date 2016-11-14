var express = require('express');
var path = require('path');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = pgp(process.env[config.use_env_variable]);
var passport = require('passport');
var jwt = require('jwt-simple');

//classes
var Restaurant = require('../class/restaurant');


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', session: false }),
  function(req, res) {
    var user = new Restaurant(
    req.user.id,
    req.user.rest_name,
    req.user.address,
    req.user.login,
    0,
    req.user.avatar,
    req.user.description, 0, 0);
    var token = jwt.encode(user, config.tokenSecret);
    res.json({ token: token });
  });

// tmp route for bearer strategy test
router.get('/profile', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var user = req.user;
    res.send(user);
  });

module.exports = router;
