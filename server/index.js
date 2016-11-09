const app = require('express')();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var logger = require('morgan');

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
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Restaurant.find({where: {id: id}}).then(function(user) {
    done(null, user);
  }).error(function(err) {
    done(err, null);
  });
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({ secret: 'supersecret', resave: false, saveUninitialized: false }));

// const root = path.join(__dirname, '/../public/');

var foods = require('./routes/foods');
var restaurants = require('./routes/restaurants');

// app.use(express.static(root));
// app.use(fallback('index.html', {root: root}));

app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    console.log('IFAUTH: ', req.isAuthenticated());
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res) {
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('profile', { user: req.user });
  });

app.use('/api/foods', foods);
app.use('/api/restaurants', restaurants);

module.exports = app;
