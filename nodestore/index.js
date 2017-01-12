var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');
var Jimp = require('jimp');
var async = require('async');
const PORT = process.env.PORT || 3500;
const winston = require('winston');
var jwt = require('jwt-simple');

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

/**
 Get Image
 * @api {get} /api/images/:uuid Get Image
 * @apiName 01_GetImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Accept image/png
 *
 * @apiParam uuid Image unique id.
 * @apiParam type Image type passed as query parameter (?type=fullsize).
 *
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Image not found
 *    HTTP/1.1 404 Not Found
 */
app.get('/api/images/:uuid', function(req, res, next) {
  switch (req.query.type) {
    case 'fullsize':
      if (fs.existsSync('./public/fullsize/' + req.params.uuid + '.png')) {
         res.setHeader('Content-Type', 'image/png');
         res.sendfile('./public/fullsize/' + req.params.uuid + '.png');
      } else {
        res.status(404).send();
      }
      break;
    case 'thumbnail':
      if (fs.existsSync('./public/thumbnail/' + req.params.uuid + '.png')) {
         res.setHeader('Content-Type', 'image/png');
         res.sendfile('./public/thumbnail/' + req.params.uuid + '.png');
      } else {
        res.status(404).send();
      }
      break;
    case 'avatar':
      if (fs.existsSync('./public/avatar/' + req.params.uuid + '.png')) {
         res.setHeader('Content-Type', 'image/png');
         res.sendfile('./public/avatar/' + req.params.uuid + '.png');
      } else {
        res.status(404).send();
      }
      break;
    default:
      res.status(404).send();
  }
});

/**
 Save Image
 * @api {post} /api/images Save Image
 * @apiName 02_SaveImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 * @apiHeader  Authorization token
 *
 * @apiParam {String} type Type of the image (avatar or food).
 * @apiParam {String} name Name of the image.
 * @apiParam {String} photo Photo to save (base64 format).
 *
 * @apiParamExample {json} Input
 *    {
 *      "type": "food",
 *      "name": "ad83hb71s3-9b83-11e6-84da-212025eb3333",
 *      "photo": "data:image/png;base64,iVBORw0K......"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Bad Request
 *    HTTP/1.1 400 Bad Request
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
app.post('/api/images', function(req, res, next) {
  if (req.body.type == undefined || req.body.name == undefined || req.body.photo == undefined || req.headers.authorization == undefined) {
    return res.status(400).send();
  }

  try {
    var decoded = jwt.decode(req.headers.authorization, 'tokensecret');
  } catch (e) {
    return res.status(401).send();
  }

  if (decoded !== 'authorized') {
    return res.status(401).send();
  }
  switch (req.body.type) {
    case 'avatar':
      var imageBuffer = decodeBase64Image(req.body.photo);
      fs.writeFile('./tmp/' + req.body.name + '.png', imageBuffer.data, function(err) {
        if (err) throw err;
        async.waterfall([
          (callback) => {
            Jimp.read('./tmp/' + req.body.name + '.png', function(err, image) {
              if (err) throw err;
              image.contain(276, 276)
                .write('./public/avatar/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - AVATAR SAVED');
              var avatar = true;
              callback(null, avatar);
            });
          },
          (avatar, callback) => {
            if (fs.existsSync('./tmp/' + req.body.name + '.png')) {
              fs.unlink('./tmp/' + req.body.name + '.png', (err) => {
                if (err) throw err;
                winston.log('info', req.body.name + ' - TMP AVATAR SUCCESFULLY DELETED');
                var done = true;
                callback(null, done);
              });
            } else {
              return res.status(404).send();
            }
          }
        ], (err, result) => {
          if (err) {
            throw err;
          }
        });
        res.status(200).send();
      });
      break;
    case 'food':
      var imageBuffer = decodeBase64Image(req.body.photo);
      fs.writeFile('./tmp/' + req.body.name + '.jpg', imageBuffer.data, function(err) {
        if (err) throw err;
        async.waterfall([
          (callback) => {
            Jimp.read('./tmp/' + req.body.name + '.jpg', function(err, image) {
              if (err) throw err;
              image.contain(276, 276)
                .write('./public/thumbnail/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - THUMBNAIL SAVED');
              var thumbnail = true;
              callback(null, thumbnail);
            });
          },
          (thumbnail, callback) => {
            Jimp.read('./tmp/' + req.body.name + '.jpg', function(err, image) {
              if (err) throw err;
              image.contain(540, Jimp.AUTO)
                .write('./public/fullsize/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - FULLSIZE SAVED');
              var fullsize = true;
              callback(null, fullsize);
            });
          },
          (fullsize, callback) => {
            if (fs.existsSync('./tmp/' + req.body.name + '.jpg')) {
              fs.unlink('./tmp/' + req.body.name + '.jpg', (err) => {
                if (err) throw err;
                winston.log('info', req.body.name + 'TMP SUCCESFULLY DELETED');
                var done = true;
                callback(null, done);
              });
            } else {
              return res.status(404).send();
            }
          }
        ], (err, result) => {
          if (err) {
            throw err;
          }
        });
        res.status(200).send();
      });
      break;
    default:
      res.status(400).send();
  }
});

/**
 Delete Food Image
 * @api {delete} /api/delete Delete Food Image
 * @apiName 03_DeleteFoodImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 *
 * @apiParam {String} uuid UUID of the Food.
 *
 * @apiParamExample {json} Input
 *    {
 *      "uuid": "ad83hb71s3-9b83-11e6-84da-212025eb3333"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
app.delete('/api/images/:uuid', function(req, res, next) {
  try {
    var decoded = jwt.decode(req.headers.authorization, 'tokensecret');
  } catch (e) {
    return res.status(401).send();
  }

  if (decoded !== 'authorized') {
    return res.status(401).send();
  }
  async.waterfall([
    (callback) => {
      if (fs.existsSync('./public/thumbnail/' + req.params.uuid + '.png')) {
        fs.unlink('./public/thumbnail/' + req.params.uuid + '.png', (err) => {
          if (err) throw err;
          winston.log('info', req.params.uuid + ' - THUMBNAIL SUCCESFULLY DELETED');
          var thumbnail = true;
          callback(null, thumbnail);
        });
      } else {
        return res.status(404).send();
      }
    },
    (thumbnail, callback) => {
      if (fs.existsSync('./public/fullsize/' + req.params.uuid + '.png')) {
        fs.unlink('./public/fullsize/' + req.params.uuid + '.png', (err) => {
          if (err) throw err;
          winston.log('info', req.params.uuid + ' - FULLSIZE SUCCESFULLY DELETED');
          var done = true;
          callback(null, done);
        });
      } else {
        return res.status(404).send();
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
