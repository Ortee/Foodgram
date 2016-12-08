var express = require('express')
var app = express()
var path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');
const PORT = process.env.PORT || 3500;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// BASE64 to imgage
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/upload', function(req, res, next) {
  req.accepts('application/json');
  var imageBuffer = decodeBase64Image(req.body[0].photo);
  fs.writeFile(req.body[0].uuid+'.jpg', imageBuffer.data, function(err) {
    if (err) {
      res.status(404).send();
    }
    console.log('IMAGE: ', req.body[0].uuid,' - SAVED');
    res.status(201).send();
  });
});

app.listen(PORT, function () {
  console.log(`STORE SERVER Listening on ${PORT}`);
});
