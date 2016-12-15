const express = require('express');
const path = require('path');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const passport = require('passport');
const jwt = require('jwt-simple');

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

// tmp route for bearer strategy test
router.get('/profile', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var user = req.user;
    res.send(user);
  });

module.exports = router;
