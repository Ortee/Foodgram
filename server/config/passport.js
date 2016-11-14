var passport = require('passport');
var path = require('path');
var Strategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jwt-simple');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

var Restaurant = require('./../models').Restaurant;

module.exports = function(passport) {
  passport.use(new Strategy(
    function(username, password, done) {
      Restaurant.find({ where: { login: username } }).then(function(user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect email address.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
    ));

  passport.use(new BearerStrategy(
        function(token, done) {
          try {
            var decoded = jwt.decode(token, config.tokenSecret);

            Restaurant.find({ where: { login: decoded.login } }).then(function(user) {
              if (!user) {
                return done(null, false);
              } else {
                return done(null, user);
              }
            });
          } catch (err) {
            return done(null, false);
          }
        }
    ));
};

