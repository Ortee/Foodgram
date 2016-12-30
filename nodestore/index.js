var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');
var Jimp = require('jimp');
var async = require('async');
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

// Serve static images
app.use('/api/images', express.static(path.join(__dirname, 'public')));

/**
 Save Avatar
 * @api {post} /api/upload-avatar Save Avatar
 * @apiName SaveAvatar
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json.
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} avatar Avatar of the Restaurant (base64 format).
 *
 * @apiParamExample {json} Input
 *    {
 *      "login": "fatob",
 *      "avatar": "data:image/png;base64,iVBORw0K......",
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
app.post('/api/upload-avatar', function(req, res, next) {
  req.accepts('application/json');
  var imageBuffer = decodeBase64Image(req.body[0].avatar);
  fs.writeFile('./tmp/' + req.body[0].login + '.png', imageBuffer.data, function(err) {
    if (err) throw err;
    async.waterfall([
      (callback) => {
        Jimp.read('./tmp/' + req.body[0].login + '.png', function(err, image) {
          if (err) throw err;
          image.contain(276, 276)
            .write('./public/avatar/' + req.body[0].login + '.png');
          winston.log('info', req.body[0].login, ' - AVATAR SAVED');
          var avatar = true;
          callback(null, avatar);
        });
      },
      (avatar, callback) => {
        if (fs.existsSync('./tmp/' + req.body[0].login + '.png')) {
          fs.unlink('./tmp/' + req.body[0].login + '.png', (err) => {
            if (err) throw err;
            winston.log('info', req.body[0].login + ' - TMP AVATAR SUCCESFULLY DELETED');
            var done = true;
            callback(null, done);
          });
        }
      }
    ], (err, result) => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send();
  });
});

/**
 Save Food Image
 * @api {post} /api/upload Save Food Image
 * @apiName SaveFoodImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json.
 *
 * @apiParam {String} uuid UUID of the Food.
 * @apiParam {String} photo Photo of the Food (base64 format).
 *
 * @apiParamExample {json} Input
 *    {
 *      "uuid": "ad83hb71s3-9b83-11e6-84da-212025eb3333",
 *      "photo": "data:image/png;base64,iVBORw0K......",
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
app.post('/api/upload', function(req, res, next) {
  req.accepts('application/json');
  var imageBuffer = decodeBase64Image(req.body[0].photo);
  fs.writeFile('./tmp/' + req.body[0].uuid + '.jpg', imageBuffer.data, function(err) {
    if (err) throw err;
    async.waterfall([
      (callback) => {
        Jimp.read('./tmp/' + req.body[0].uuid + '.jpg', function(err, image) {
          if (err) throw err;
          image.contain(276, 276)
            .write('./public/thumbnail/' + req.body[0].uuid + '.png');
          winston.log('info', req.body[0].uuid, ' - THUMBNAIL SAVED');
          var thumbnail = true;
          callback(null, thumbnail);
        });
      },
      (thumbnail, callback) => {
        Jimp.read('./tmp/' + req.body[0].uuid + '.jpg', function(err, image) {
          if (err) throw err;
          image.contain(540, Jimp.AUTO)
            .write('./public/fullsize/' + req.body[0].uuid + '.png');
          winston.log('info', req.body[0].uuid, ' - FULLSIZE SAVED');
          var fullsize = true;
          callback(null, fullsize);
        });
      },
      (fullsize, callback) => {
        if (fs.existsSync('./tmp/' + req.body[0].uuid + '.jpg')) {
          fs.unlink('./tmp/' + req.body[0].uuid + '.jpg', (err) => {
            if (err) throw err;
            winston.log('info', req.body[0].uuid + 'TMP SUCCESFULLY DELETED');
            var done = true;
            callback(null, done);
          });
        }
      }
    ], (err, result) => {
      if (err) {
        throw err;
      }
    });
    res.status(200).send();
  });
});

/**
 Delete Food Image
 * @api {delete} /api/upload Delete Food Image
 * @apiName DeleteFoodImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json.
 *
 * @apiParam {String} uuid UUID of the Food.
 *
 * @apiParamExample {json} Input
 *    {
 *      "uuid": "ad83hb71s3-9b83-11e6-84da-212025eb3333",
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */

app.delete('/api/delete', function(req, res, next) {
  req.accepts('application/json');
  async.waterfall([
    (callback) => {
      if (fs.existsSync('./public/thumbnail/' + req.body[0].uuid + '.png')) {
        fs.unlink('./public/thumbnail/' + req.body[0].uuid + '.png', (err) => {
          if (err) throw err;
          winston.log('info', req.body[0].uuid + ' - THUMBNAIL SUCCESFULLY DELETED');
          var thumbnail = true;
          callback(null, thumbnail);
        });
      }
    },
    (thumbnail, callback) => {
      if (fs.existsSync('./public/fullsize/' + req.body[0].uuid + '.png')) {
        fs.unlink('./public/fullsize/' + req.body[0].uuid + '.png', (err) => {
          if (err) throw err;
          winston.log('info', req.body[0].uuid + ' - FULLSIZE SUCCESFULLY DELETED');
          var done = true;
          callback(null, done);
        });
      }
    },
  ], (err, result) => {
    if (err) {
      throw err;
    }
  });
  res.status(204).send();
});

app.listen(PORT, function() {
  winston.log('info', `STORE SERVER Listening on ${PORT}`);
});
