const app = require('express')();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const passport = require('passport');
const logger = require('morgan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const root = path.join(__dirname, '/../public/');

var foods = require('./routes/foods');
var restaurants = require('./routes/restaurants');
var authorization = require('./routes/authorization');

app.use(express.static(root));
app.use(fallback('index.html', {root: root}));

require('./config/passport')(passport);
app.use(passport.initialize());

app.use('/', authorization);
app.use('/api/foods', foods);
app.use('/api/restaurants', restaurants);

module.exports = app;
