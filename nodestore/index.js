var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;
const winston = require('winston');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var images = require('./routes/images');

app.use('/api/images', images);

app.listen(PORT, function() {
  winston.log('info', `STORE SERVER Listening on ${PORT}`);
});
