const express = require('express');
const router = express.Router();
const request = require('superagent');
const models = require('../models');

//classes
var Food = require('../class/food');

function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset()
    * 60000) + (3600000 * 2));
}

// Get all food
router.get('/', function(req, res, next) {
  models.Food.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    include: [{ model: models.Restaurant, attributes: ['rest_name', 'login']}]
  }).then(function(data) {
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Cache-Control', 'public, max-age=31557600');
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

router.get('/likes/update', function(req, res, next) {
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

// Get single food
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
    res.json(newFood);
  }).catch(function(error) {
    res.status(404).send();
  });
});


// Save food
router.post('/', function(req, res, next) {
  req.accepts('application/json');
  models.Restaurant.findOne({
    where: {
      login: req.body[0].login
    },
    attributes: ['id']
  }).then(function(user) {
    var newFood = new Food(user.login)
      .uuid(req.body[0].uuid)
      .username(user.rest_name)
      .description(req.body[0].description)
      .hashtags(req.body[0].hashtags)
      .photo(req.body[0].photo)
      .created_at(getTimestamp())
      .updated_at(getTimestamp());
    request
      .post('http://nodestore:3500/api/upload')
      .set('Content-Type', 'application/json')
      .send([{
        uuid: newFood.getUuid(),
        photo: newFood.getPhoto()
      }])
      .end((err) => {
        if (err) {
          console.log(err);
          res.status(404).send();
        } else {
          console.log('Image sent to nodestore.');
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

// Update food likes
router.put('/likes', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  models.Food.findOne({
    where: {
      uuid: _id
    },
    attributes: ['likes']
  }).then(function(food) {
    models.Food.update(
      {
        likes: food.likes + 1
      },
      {
        where: {
          'uuid': _id
        }
      }
    )
      .then(function() {
        res.status(201).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });
  });
});

router.put('/likes/decrement', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  models.Food.findOne({
    where: {
      uuid: _id
    },
    attributes: ['likes']
  }).then(function(food) {
    models.Food.update(
      {
        likes: food.likes - 1
      },
      {
        where: {
          'uuid': _id
        }
      }
    )
      .then(function() {
        res.status(201).send();
      })
      .catch(function(error) {
        res.status(404).send();
      });
  });
});

// Update food dislikes
router.put('/dislikes', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  models.Food.findOne({
    where: {
      uuid: _id
    },
    attributes: ['dislikes']
  }).then(function(food) {
    models.Food.update(
      {
        dislikes: food.dislikes + 1
      },
      {
        where: {
          'uuid': _id
        }
      }
  )
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.send(error);
      res.status(404).send();
    });
  });
});

router.put('/dislikes/decrement', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  models.Food.findOne({
    where: {
      uuid: _id
    },
    attributes: ['dislikes']
  }).then(function(food) {
    models.Food.update(
      {
        dislikes: food.dislikes - 1
      },
      {
        where: {
          'uuid': _id
        }
      }
    )
      .then(function() {
        res.status(201).send();
      })
      .catch(function(error) {
        res.send(error);
        res.status(404).send();
      });
  });
});

// Delete food
router.delete('/', function(req, res, next) {
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  models.Food.destroy({
    where: {
      uuid: _id
    }
  })
    .then(function() {
      res.status(204).send();
    })
    .catch(function(error) {
      res.status(409).send();
    });
});

module.exports = router;
