const express = require('express');
const router = express.Router();
const winston = require('winston');
var fs = require('fs');
var Jimp = require('jimp');
var async = require('async');
var jwt = require('jwt-simple');
var base64Decoder = require('../libs/base64Decoder');
var path = require('path');

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
router.get('/:uuid', function(req, res, next) {
  var imagePath = (__dirname != '/storeapp/routes') ? '../nodestore/public' : './public';

  switch (req.query.type) {
    case 'fullsize':
      if (fs.existsSync(imagePath + '/fullsize/' + req.params.uuid + '.png')) {
        res.setHeader('Content-Type', 'image/png');
        res.sendfile(path.resolve(imagePath + '/fullsize/' + req.params.uuid + '.png'));
      } else {
        res.status(404).send();
      }
      break;
    case 'thumbnail':
      if (fs.existsSync(imagePath + '/thumbnail/' + req.params.uuid + '.png')) {
        res.setHeader('Content-Type', 'image/png');
        res.sendfile(path.resolve(imagePath + '/thumbnail/' + req.params.uuid + '.png'));
      } else {
        res.status(404).send();
      }
      break;
    case 'avatar':
      if (fs.existsSync(imagePath + '/avatar/' + req.params.uuid + '.png')) {
        res.setHeader('Content-Type', 'image/png');
        res.sendfile(path.resolve(imagePath + '/avatar/' + req.params.uuid + '.png'));
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
 * @apiHeader  Content-Type routerlication/json
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
router.post('/', function(req, res, next) {
  req.accepts('routerlication/json');

  var publicPath = (__dirname != '/storeapp/routes') ? '../nodestore/public' : './public';
  var tmpPath = (__dirname != '/storeapp/routes') ? '../nodestore/tmp' : './tmp';

  if (req.body.type == undefined ||
    req.body.name == undefined ||
    req.body.photo == undefined ||
    req.headers.authorization == undefined) {
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

  var imageBuffer = base64Decoder(req.body.photo);
  switch (req.body.type) {
    case 'avatar':
      fs.writeFile(tmpPath + req.body.name + '.png', imageBuffer.data, function(err) {
        if (err) throw err;
        async.waterfall([
          (callback) => {
            Jimp.read(tmpPath + req.body.name + '.png', function(err, image) {
              if (err) throw err;
              image.contain(276, 276)
                .write(publicPath + '/avatar/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - AVATAR SAVED');
              var avatar = true;
              callback(null, avatar);
            });
          },
          (avatar, callback) => {
            if (fs.existsSync(tmpPath + req.body.name + '.png')) {
              fs.unlink(tmpPath + req.body.name + '.png', (err) => {
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
      fs.writeFile(tmpPath + req.body.name + '.jpg', imageBuffer.data, function(err) {
        if (err) throw err;
        async.waterfall([
          (callback) => {
            Jimp.read(tmpPath + req.body.name + '.jpg', function(err, image) {
              if (err) throw err;
              image.contain(276, 276)
                .write(publicPath + '/thumbnail/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - THUMBNAIL SAVED');
              var thumbnail = true;
              callback(null, thumbnail);
            });
          },
          (thumbnail, callback) => {
            Jimp.read(tmpPath + req.body.name + '.jpg', function(err, image) {
              if (err) throw err;
              image.contain(540, Jimp.AUTO)
                .write(publicPath + '/fullsize/' + req.body.name + '.png');
              winston.log('info', req.body.name, ' - FULLSIZE SAVED');
              var fullsize = true;
              callback(null, fullsize);
            });
          },
          (fullsize, callback) => {
            if (fs.existsSync(tmpPath + req.body.name + '.jpg')) {
              fs.unlink(tmpPath + req.body.name + '.jpg', (err) => {
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
 * @api {delete} /api/images/:uuid Delete Image
 * @apiName 03_DeleteImage
 * @apiGroup Imagestore
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type routerlication/json
 *
 * @apiParam uuid Image unique id.
 *
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 Not Found
 */
router.delete('/:uuid', function(req, res, next) {
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
        res.status(404).send();
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
        res.status(404).send();
      }
    },
  ], (err, result) => {
    if (err) {
      throw err;
    }
  });
  res.status(204).send();
});

module.exports = router;
