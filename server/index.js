const app = require('express')();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var logger = require('morgan');
var jwt = require('jwt-simple');

var tokenSecret = 'topsecret';
var Restaurant = require('./models').Restaurant;

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
        var decoded = jwt.decode(token, tokenSecret);

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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const root = path.join(__dirname, '/../public/');

var foods = require('./routes/foods');
var restaurants = require('./routes/restaurants');
var authorization = require('./routes/authorization');

app.use(express.static(root));
app.use(fallback('index.html', {root: root}));

app.use(passport.initialize());

// Define routes.
// app.get('/',
//   function(req, res) {
//     res.render('home', { user: req.user });
//   });

// app.get('/login',
//   function(req, res) {
//     res.render('login');
//   });

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login', session: false }),
//   function(req, res) {
//     var token = jwt.encode(req.user, tokenSecret);
//     res.json({ token: token });
//   });

// app.get('/profile', passport.authenticate('bearer', {session: false}),
//   function(req, res) {
//     var user = req.user;
//     res.send(user);
//   });

app.use('/', authorization);
app.use('/api/foods', foods);
app.use('/api/restaurants', restaurants);

module.exports = app;
