const express = require('express');
const router = express.Router();
const request = require('superagent');
const models = require('../models');
const passport = require('passport');
const winston = require('winston');
const validator = require('validator');
const alertConfig = require('./alertsConfig');
const jwt = require('jwt-simple');


//classes
var Food = require('../class/food');

function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset()
    * 60000) + (3600000 * 2));
}

/**
 Get all foods
 * @api {get} /api/foods Get Foods
 * @apiName 02_GetFoods
 * @apiGroup Food
 * @apiVersion 1.0.0
 * @apiHeader  Accept application/json
 *
 * @apiSuccess {String} login Login of the Restaurant.
 * @apiSuccess {Int} id Id of the Food.
 * @apiSuccess {String} uuid UUID of the Food.
 * @apiSuccess {String} username  Name of the Restaurant who owns this food.
 * @apiSuccess {String} description  Description of the Food.
 * @apiSuccess {String} hashtags Hashtags of the Food.
 * @apiSuccess {Int} likes Likes of the Food.
 * @apiSuccess {Int} dislikes Dislikes of the Food.
 * @apiSuccess {Date} created_at Food creation date.
 * @apiSuccess {Date} updated_at Food update date.
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "login": "pastwisko",
 *        "id": 3,
 *        "uuid": "ffa3fa30-9b83-11e6-84da-212055eb89db",
 *        "username": "Pastwisko",
 *        "description": "Nice",
 *        "hashtags": "#love",
 *        "likes": 10,
 *        "dislikes": 13,
 *        "created_at": "2016-10-17T20:31:40.000Z",
 *        "updated_at": "2016-10-17T20:31:40.000Z"
 *      },
 *      {
 *        "login": "pastwisko",
 *        "id": 2,
 *        "uuid": "efa3fa30-9b83-11e6-84da-212055eb89db",
 *        "username": "Pastwisko",
 *        "description": "Very nice",
 *        "hashtags": "#tasty #love",
 *        "likes": 8,
 *        "dislikes": 3,
 *        "created_at": "2016-10-16T20:31:40.000Z",
 *        "updated_at": "2016-10-16T20:31:40.000Z"
 *      }
 *    ]
 *
 * @apiErrorExample {json} Foods not found
 *    HTTP/1.1 404 Not Found
 */
router.get('/', function(req, res, next) {
  models.Food.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    include: [{ model: models.Restaurant, attributes: ['rest_name', 'login']}]
  }).then(function(data) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    var Foods = data.map((elem) => new Food(elem.Restaurant.login)
      .id(elem.id)
      .uuid(elem.uuid)
      .username(elem.Restaurant.rest_name)
      .description(elem.description)
      .hashtags(elem.hashtags)
      .likes(elem.likes)
      .dislikes(elem.dislikes)
      .created_at(elem.created_at)
      .updated_at(elem.updated_at)
    );
    res.json(Foods);
  }).catch(function(error) {
    res.status(404).send();
  });
});

/**
 Get foods likes/dislikes
 * @api {get} /api/foods/likes Get Likes/Dislikes
 * @apiName 05_GetLikesDislikes
 * @apiGroup Food
 * @apiVersion 1.0.0
 * @apiHeader  Accept application/json
 *
 * @apiSuccess {Int} id Id of the Food.
 * @apiSuccess {Int} likes Likes of the Food.
 * @apiSuccess {Int} dislikes Dislikes of the Food.
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "id": 1,
 *        "likes": 3,
 *        "dislikes": 5,
 *      },
 *      {
 *        "id": 2,
 *        "likes": 8,
 *        "dislikes": 3,
 *      }
 *    ]
 *
 * @apiErrorExample {json} Foods not found
 *    HTTP/1.1 404 Not Found
 */
router.get('/likes', function(req, res, next) {
  models.Food.findAll({
    attributes: ['id', 'likes', 'dislikes'],
  }).then(function(data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }).catch(function(error) {
    res.status(404).send();
  });
});

/**
 Get single food
 * @api {get} /api/foods/:uuid Get Food
 * @apiName 01_GetFood
 * @apiGroup Food
 * @apiVersion 1.0.0
 * @apiHeader  Accept application/json
 *
 * @apiParam uuid Food unique id.
 *
 * @apiSuccess {String} login Login of the Restaurant.
 * @apiSuccess {Int} id Id of the Food.
 * @apiSuccess {String} uuid UUID of the Food.
 * @apiSuccess {String} username  Name of the Restaurant who owns this food.
 * @apiSuccess {String} description  Description of the Food.
 * @apiSuccess {String} hashtags Hashtags of the Food.
 * @apiSuccess {Int} likes Likes of the Food.
 * @apiSuccess {Int} dislikes Dislikes of the Food.
 * @apiSuccess {Date} created_at Food creation date.
 * @apiSuccess {Date} updated_at Food update date.
 *
 * @apiSuccessExample Success
 *     HTTP/1.1 200 OK
 *    [
 *      {
 *        "login": "pastwisko",
 *        "id": 3,
 *        "uuid": "ffa3fa30-9b83-11e6-84da-212055eb89db",
 *        "username": "Pastwisko",
 *        "description": "Nice",
 *        "hashtags": "#love",
 *        "likes": 10,
 *        "dislikes": 13,
 *        "created_at": "2016-10-17T20:31:40.000Z",
 *        "updated_at": "2016-10-17T20:31:40.000Z"
 *      }
 *    ]
 *
 * @apiErrorExample {json} Food not found
 *    HTTP/1.1 404 Not Found
 */
router.get('/:uuid', function(req, res, next) {
  var _uuid = req.params.uuid;
  models.Food.findAll({
    where: {
      uuid: _uuid
    },
    include: [
      {
        model: models.Restaurant,
        attributes: ['rest_name', 'login']
      }
    ]
  }).then(function(data) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    var newFood = data.map((elem) => new Food(elem.Restaurant.login)
      .id(elem.id)
      .uuid(elem.uuid)
      .username(elem.Restaurant.rest_name)
      .description(elem.description)
      .hashtags(elem.hashtags)
      .likes(elem.likes)
      .dislikes(elem.dislikes)
      .created_at(elem.created_at)
      .updated_at(elem.updated_at)
    );
    res.json(newFood[0]);
  }).catch(function(error) {
    res.status(404).send();
  });
});


/**
 Add food
 * @api {post} /api/foods Add Food
 * @apiName 03_AddFood
 * @apiGroup Food
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 * @apiHeader Authorization Bearer token
 *
 * @apiParam {String} login Login of the Restaurant.
 * @apiParam {String} uuid UUID of the Food.
 * @apiParam {String} description  Description of the Food.
 * @apiParam {String} hashtags Hashtags of the Food.
 * @apiParam {String} avatar Avatar of the Restaurant (base64 format).
 *
 * @apiParamExample {json} Input
 *    {
 *      "login": "fatbob",
 *      "uuid": "ad83hb71s3-9b83-11e6-84da-212025eb3333",
 *      "description": "Very good burger",
 *      "hashtags": "#tasty #awesome",
 *      "photo": "data:image/png;base64,iVBORw0K......"
 *    }
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *
 * @apiErrorExample Bad request
 *    HTTP/1.1 400 Bad request
 *    {
 *      "Description is too short or too long (min: 2, max: 250 letters)."
 *    }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
router.post('/', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  req.accepts('application/json');
  models.Restaurant.findOne({
    where: {
      login: req.body.login
    },
    attributes: ['id']
  }).then(function(user) {

    if (!validator.isLength(req.body.description, {min: 2, max: 250})) {
      return res.status(400).send(alertConfig.addFood.description.length);
    } else if (!validator.isLength(req.body.hashtags, {min: 2, max: 250})) {
      return res.status(400).send(alertConfig.addFood.hashtags.length);
    } else if (!(new RegExp(/^(#[a-zA-Z0-9]+)(\s#[a-zA-Z0-9]+)*$/).test(req.body.hashtags))) {
      return res.status(400).send(alertConfig.addFood.hashtags.valid);
    } else if (!validator.isAscii(req.body.description)) {
      return res.status(400).send(alertConfig.addFood.description.ascii);
    } else if (!(new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(req.body.photo))) {
      return res.status(400).send(alertConfig.addFood.photo.extension);
    } else if (Buffer.byteLength(req.body.photo, 'utf8') > 2097152) {
      return res.status(400).send(alertConfig.addFood.photo.size);
    }
    var newFood = new Food(user.login)
      .uuid(req.body.uuid)
      .username(user.rest_name)
      .description(req.body.description)
      .hashtags(req.body.hashtags)
      .photo(req.body.photo)
      .created_at(getTimestamp())
      .updated_at(getTimestamp());
    var token = jwt.encode('authorized', 'tokensecret');
    request
      .post('http://nodestore:3500/api/images')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({
        type: 'food',
        name: newFood.getUuid(),
        photo: newFood.getPhoto()
      })
      .end((err) => {
        if (err) {
          res.status(404).send();
        } else {
          winston.log('info', 'Image sent to nodestore.');
          models.Food.create({
            uuid: newFood.getUuid(),
            description: newFood.getDescription(),
            hashtags: newFood.getHashtags(),
            likes: 0,
            dislikes: 0,
            created_at: newFood.getCreatedAt(),
            updated_at: newFood.getUpdatedAt(),
            restaurant_id: user.id
          }, {})
            .then(function() {
              res.status(201).send();
            })
            .catch(function(error) {
              res.status(404).send();
            });
        }
      });
  });
});

/**
 Add Likes
 * @api {put} /api/foods/:uuid/likes Add Likes
 * @apiName 06_AddLikes
 * @apiGroup Food
 * @apiVersion 1.0.0
 *
 * @apiParam uuid UUID of the Food.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 Not Found
 */
router.put('/:uuid/likes', function(req, res, next) {
  var _uuid = req.params.uuid;
  models.Food.findOne({
    where: {
      uuid: _uuid
    },
    attributes: ['likes']
  }).then(function(food) {
    models.Food.update(
      {
        likes: food.likes + 1
      },
      {
        where: {
          'uuid': _uuid
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

/**
 Delete Likes
 * @api {delete} /api/foods/:uuid/likes Delete Likes
 * @apiName 07_DeleteLikes
 * @apiGroup Food
 * @apiVersion 1.0.0
 *
 * @apiParam uuid UUID of the Food.
 *
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 Not Found
 */
router.delete('/:uuid/likes', function(req, res, next) {
  var _uuid = req.params.uuid;
  models.Food.findOne({
    where: {
      uuid: _uuid
    },
    attributes: ['likes']
  }).then(function(food) {
    models.Food.update(
      {
        likes: food.likes - 1
      },
      {
        where: {
          'uuid': _uuid
        }
      }
    )
      .then(function() {
        res.status(204).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });
  });
});

/**
 Add Dislikes
 * @api {put} /api/foods/:uuid/dislikes Add Dislikes
 * @apiName 08_AddDislikes
 * @apiGroup Food
 * @apiVersion 1.0.0
 *
 * @apiParam uuid UUID of the Food.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
router.put('/:uuid/dislikes', function(req, res, next) {
  var _uuid = req.params.uuid;
  models.Food.findOne({
    where: {
      uuid: _uuid
    },
    attributes: ['dislikes']
  }).then(function(food) {
    models.Food.update(
      {
        dislikes: food.dislikes + 1
      },
      {
        where: {
          'uuid': _uuid
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

/**
 Delete Dislikes
 * @api {delete} /api/foods/:uuid/dislikes Delete Dislikes
 * @apiName 09_DeleteDislikes
 * @apiGroup Food
 * @apiVersion 1.0.0
 *
 * @apiParam uuid UUID of the Food.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 OK
 *
 * @apiErrorExample {json} Server problem
 *    HTTP/1.1 404 Server problem
 */
router.delete('/:uuid/dislikes', function(req, res, next) {
  var _uuid = req.params.uuid;
  models.Food.findOne({
    where: {
      uuid: _uuid
    },
    attributes: ['dislikes']
  }).then(function(food) {
    models.Food.update(
      {
        dislikes: food.dislikes - 1
      },
      {
        where: {
          'uuid': _uuid
        }
      }
    )
      .then(function() {
        res.status(204).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });
  });
});

/**
 Delete Food
 * @api {delete} /api/foods/:uuid Delete Food
 * @apiName 04_DeleteFood
 * @apiGroup Food
 * @apiVersion 1.0.0
 * @apiHeader  Content-Type application/json
 * @apiHeader Authorization Bearer token
 *
 * @apiParam uuid Food unique id.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 *
 * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 Not Found
 */
router.delete('/:uuid', passport.authenticate('bearer', {session: false}),
function(req, res, next) {
  var _uuid = req.params.uuid;
  var token = jwt.encode('authorized', 'tokensecret');
  request
    .delete('http://nodestore:3500/api/images/' + _uuid)
    .set('Authorization', token)
    .send()
    .end((err) => {
      if (err) {
        res.status(404).send();
      } else {
        winston.log('info', 'Image removed.');
        models.Food.destroy({
          where: {
            uuid: _uuid
          }
        })
          .then(function() {
            res.status(204).send();
          })
          .catch(function(error) {
            res.status(404).send();
          });
      }
    });
});

module.exports = router;
