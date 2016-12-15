var express = require('express')
var app = express()
var path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');
var Jimp = require('jimp');
var async = require('async');
const PORT = process.env.PORT || 3500;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

app.use('/api/images', express.static(path.join(__dirname, 'public')));

app.post('/api/upload-avatar', function(req, res, next) {
  req.accepts('application/json');
  var imageBuffer = decodeBase64Image(req.body[0].avatar);
  fs.writeFile('./tmp/' + req.body[0].login + '.png', imageBuffer.data, function(err) {
    if (err) {
      res.status(404).send();
    }
    async.waterfall([
      (callback) => {
        Jimp.read('./tmp/' + req.body[0].login + '.png', function(err, image) {
          if (err) throw err;
          image.contain(276, 276)
            .write('./public/avatar/' + req.body[0].login + '.png');
          console.log(req.body[0].login, ' - AVATAR SAVED');
          var avatar = true;
          callback(null, avatar);
        });
      },
      (avatar, callback) => {
        if (fs.existsSync('./tmp/' + req.body[0].login + '.png')) {
          fs.unlink('./tmp/' + req.body[0].login + '.png', (err) => {
            if (err) throw err;
            console.log(req.body[0].login + ' - TMP AVATAR SUCCESFULLY DELETED');
            var done = true;
            callback(null, done);
          });
        }
      }
    ], (err, result) => {
      console.log(result);
    });
    res.status(201).send();
  });
});

app.post('/api/upload', function(req, res, next) {
  req.accepts('application/json');
  var imageBuffer = decodeBase64Image(req.body[0].photo);
  fs.writeFile('./tmp/' + req.body[0].uuid + '.jpg', imageBuffer.data, function(err) {
    if (err) {
      res.status(404).send();
    }
    async.waterfall([
      (callback) => {
        Jimp.read('./tmp/' + req.body[0].uuid + '.jpg', function(err, image) {
          if (err) throw err;
          image.contain(276, 276)
            .write('./public/thumbnail/' + req.body[0].uuid + '.png');
            console.log(req.body[0].uuid, ' - THUMBNAIL SAVED');
          var thumbnail = true;
          callback(null, thumbnail);
        });
      },
      (thumbnail, callback) => {
        Jimp.read('./tmp/' + req.body[0].uuid + '.jpg', function(err, image) {
          if (err) throw err;
          image.contain(540, Jimp.AUTO)
            .write('./public/fullsize/' + req.body[0].uuid + '.png');
          console.log(req.body[0].uuid, ' - FULLSIZE SAVED');
          var fullsize = true;
          callback(null, fullsize);
        });
      },
      (fullsize, callback) => {
        if (fs.existsSync('./tmp/' + req.body[0].uuid + '.jpg')) {
          fs.unlink('./tmp/' + req.body[0].uuid + '.jpg', (err) => {
            if (err) throw err;
            console.log(req.body[0].uuid + 'TMP SUCCESFULLY DELETED');
            var done = true;
            callback(null, done);
          });
        }
      }
    ], (err, result) => {
      console.log(result);
    });
    res.status(201).send();
  });
});

app.listen(PORT, function() {
  console.log(`STORE SERVER Listening on ${PORT}`);
});
