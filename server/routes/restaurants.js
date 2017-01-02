const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
const request = require('superagent');
const winston = require('winston');
const validator = require('validator');
const alertConfig = require('./alertsConfig');

//classes
const Restaurant = require('../class/restaurant');

/**
 Get single restaurant
 * @api {get} /api/restaurants/:login Get Restaurant
 * @apiName 01_GetRestaurant
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Accept application/json.
 *
 * @apiParam {Login} login Restaurant unique LOGIN.
 *
 * @apiSuccess {String} rest_name Name of the Restaurant.
 * @apiSuccess {String} login Login of the Restaurant.
 * @apiSuccess {String} address  Address of the Restaurant.
 * @apiSuccess {Boolean} avatar=false  Checks if avatar of the Restaurant is set.
 * @apiSuccess {String} description  Description of the Restaurant.
 * @apiSuccess {Array} foods Foods of the Restaurant.
 * @apiSuccess {Int} likes Likes of the Restaurant.
 * @apiSuccess {Int} dislikes Dislikes of the Restaurant.
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *     {
 *        "rest_name": "Fat Bob Burger",
 *        "login": "fatbob",
 *        "address": "Kramarska 21, Poznan",
 *        "avatar": false,
 *        "description": "super opis fat boba",
 *        "foods": [
 *          {
 *           "uuid": "x7dafa30-9b83-11e6-84da-212055eb89db",
 *           "likes": 53,
 *           "dislikes": 23
 *          }
 *        ],
 *        "likes": 53,
 *        "dislikes": 23
 *     }
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
router.get('/:login', function(req, res, next) {
  var _login = req.params.login;
  models.Restaurant.findOne({
    where: {
      login: _login
    },
    include: [
      {
        model: models.Food,
        attributes: ['uuid', 'likes', 'dislikes']
      }
    ],
    order: [
      [ { model: models.Food }, 'updated_at', 'DESC' ]
    ]
  })
    .then(function(data) {
      var rate = {
        likes: 0,
        dislikes: 0
      };
      data.Food.map((elem) => {
        Object.assign(rate, {likes: rate.likes + elem.likes});
        Object.assign(rate, {dislikes: rate.dislikes + elem.dislikes});
      });
      res.setHeader('Content-Type', 'application/json');
      var newRestaurant = new Restaurant(data.rest_name)
        .login(data.login)
        .address(data.address)
        .avatar(data.avatar)
        .description(data.description)
        .foods(data.Food)
        .likes(rate.likes)
        .dislikes(rate.dislikes);
      res.json(newRestaurant);
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

/**
 Update restaurant
 * @api {put} /api/restaurants/update Update Restaurant
 * @apiName 02_UpdateRestaurant
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json.
 * @apiHeader Authorization Bearer token
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} rest_name Name of the Restaurant.
 * @apiParam {String} address  Address of the Restaurant.
 * @apiParam {String} description  Description of the Restaurant.
 * @apiParam {String} avatar Avatar of the Restaurant (base64 format).
 * @apiParamExample {json} Input
 *    {
 *      "login": "fatbob",
 *      "rest_name": "Fat Bob Burger",
 *      "address": "Kramarska 21, Poznan",
 *      "description": "super opis fat boba",
 *      "avatar": "data:image/jpeg;base64,/9j/4AAQS...."
 *    }
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
router.put('/update', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  req.accepts('application/json');
  var _login = req.body[0].login;
  var update = {};

  if (req.body[0].rest_name !== null) {
    if (!validator.isAscii(req.body[0].rest_name)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body[0].rest_name, {min: 5, max: 25})) {
      return res.status(400).send(alertConfig.updateRestaurant.rest_name.length);
    }
    Object.assign(update, {rest_name: req.body[0].rest_name});
  }
  if (req.body[0].address !== null) {
    if (!validator.isAscii(req.body[0].address)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body[0].address, {min: 5, max: 100})) {
      return res.status(400).send(alertConfig.updateRestaurant.address.length);
    }
    Object.assign(update, {address: req.body[0].address});
  }
  if (req.body[0].description !== null) {
    if (!validator.isAscii(req.body[0].description)) {
      return res.status(400).send(alertConfig.updateRestaurant.ascii);
    } else if (!validator.isLength(req.body[0].description, {min: 5, max: 200})) {
      return res.status(400).send(alertConfig.updateRestaurant.description.length);
    }
    Object.assign(update, {description: req.body[0].description});
  }
  if (req.body[0].avatar !== null) {
    if (!(new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(req.body[0].avatar))) {
      return res.status(400).send(alertConfig.updateRestaurant.avatar.extension);
    } else if (Buffer.byteLength(req.body[0].avatar, 'utf8') > 2097152) {
      return res.status(400).send(alertConfig.updateRestaurant.avatar.size);
    }
    request
      .post('http://nodestore:3500/api/upload-avatar')
      .set('Content-Type', 'application/json')
      .send([{
        login: req.body[0].login,
        avatar: req.body[0].avatar
      }])
      .end((err) => {
        if (err) {
          res.status(404).send();
        } else {
          winston.log('info', 'Avatar sent to nodestore.');
          Object.assign(update, {avatar: true});
          models.Restaurant.update(update, {
            where: {
              login: _login
            }
          })
            .then(function() {
              res.status(200).send();
            })
            .catch(function(error) {
              res.status(404).send();
            });
        }
      });
  }
});

/**
 Change password
 * @api {put} /api/restaurants/password Change Password
 * @apiName 03_ChangePassword
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json.
 * @apiHeader Authorization Bearer token
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} oldPassword Old password of the Restaurant.
 * @apiParam {String} newPassword  New password of the Restaurant.
 * @apiParam {String} newPassword2  Again new password of the Restaurant.
 * @apiParamExample {json} Input
 *    {
 *      "login": "fatbob",
 *      "oldPassword": "fatbob",
 *      "newPassword": "newpass",
 *      "newPassword2": "newpass",
 *    }
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Restaurant not found
 *    HTTP/1.1 404 Not Found
 */
router.put('/password', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  req.accepts('application/json');
  models.Restaurant.findOne({
    where: {
      login: req.body[0].login
    }
  }).then(function(restaurant) {
    if (!validator.equals(restaurant.password, req.body[0].oldPassword)) {
      return res.status(400).send(alertConfig.changePassword.match);
    } else if (!validator.equals(req.body[0].newPassword, req.body[0].newPassword2)) {
      return res.status(400).send(alertConfig.changePassword.different);
    } else if (!validator.isLength(req.body[0].newPassword, {min: 5, max: undefined})) {
      return res.status(400).send(alertConfig.changePassword.length);
    } else if (validator.isEmpty(req.body[0].oldPassword) ||
      validator.isEmpty(req.body[0].newPassword) ||
      validator.isEmpty(req.body[0].newPassword2)) {
      return res.status(400).send(alertConfig.changePassword.empty);
    }

    models.Restaurant.update(
      {
        password: req.body[0].newPassword
      },
      {
        where: {
          'login': req.body[0].login
        }
      }
      )
      .then(function() {
        res.status(200).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });

  });
});

module.exports = router;
