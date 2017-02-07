const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;
const winston = require('winston');

app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var foods = require('./routes/foods');
var restaurants = require('./routes/restaurants');

require('./config/passport')(passport);
app.use(passport.initialize());

app.use('/api/foods', foods);
app.use('/api/restaurants', restaurants);

if ((!module.parent)) {
  app.listen(PORT, function() {
    winston.log('info', `SERVER Listening on ${PORT}`);
  });
}

module.exports = app;
