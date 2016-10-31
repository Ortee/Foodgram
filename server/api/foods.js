var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = pgp(process.env[config.use_env_variable]);

//Mocks
const authorMock = require('../mocks/author.json')

//classes
var Food = require('../class/food');


function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset()
    * 60000) + (3600000 * 2));
}

router.get('/api/author', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json(authorMock);
});

// Get all food
router.get('/api/foods', function (req, res, next) {
  db.any(
    'SELECT id, uuid, username, description, hashtags, photo, likes, dislikes, created_at, updated_at FROM "Food" ORDER BY created_at DESC')
    .then(function (data) {
      res.setHeader('Content-Type', 'application/json');
      Foods = data.map((elem) => new Food(
        elem.id,
        elem.uuid,
        elem.username,
        elem.description,
        elem.hashtags,
        elem.photo,
        elem.likes,
        elem.dislikes,
        elem.created_at,
        elem.updated_at));
        res.json(Foods);
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

// Get single food
router.get('/api/foods/:id', function (req, res, next) {
  var _id = req.params.id;
  db.any(
    'SELECT username, description, hashtags, photo, likes, dislikes, created_at, updated_at FROM "Food" WHERE ID = $1',_id)
    .then(function (data) {
      res.setHeader('Content-Type', 'application/json');
      Foods = data.map((elem) => new Food(
        elem.id,
        elem.username,
        elem.description,
        elem.hashtags,
        elem.photo,
        elem.likes,
        elem.dislikes,
        elem.created_at,
        elem.updated_at));
        res.json(Foods);
    })
    .catch(function (error) {
      res.status(404).send();
    });
});


// Save food
router.post('/api/foods', function (req, res, next){
  req.accepts('application/json');
  var NewFood = new Food( 0,
    req.body[0].uuid,
    req.body[0].username,
    req.body[0].description,
    req.body[0].hashtags,
    req.body[0].photo,
    0,
    0,
    getTimestamp(),
    getTimestamp());
  db.query('INSERT INTO "Food" ("uuid","username", "description", "hashtags", "photo", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7)',
   [
     NewFood.getUuid(),
     NewFood.getUsername(),
     NewFood.getDescription(),
     NewFood.getHashtags(),
     NewFood.getPhoto(),
     NewFood.getCreatedAt(),
     NewFood.getUpdatedAt()
   ])
    .then(function(){
      res.status(201).send();
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

// Update food
router.put('/api/foods', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  var UpdatedFood = new Food(
    req.body[0].id,
    _id,
    null,
    req.body[0].description,
    req.body[0].hashtags,
    req.body[0].photo,
    req.body[0].likes,
    req.body[0].dislikes,
    null,
    getTimestamp());
  db.query('UPDATE "Food" SET "description" = $2, "hashtags" = $3, "photo" = $4, "likes" = $5, "dislikes" = $6, "updated_at" = $7 WHERE "uuid" = $1',
  [
    _id,
    UpdatedFood.getDescription(),
    UpdatedFood.getHashtags(),
    UpdatedFood.getPhoto(),
    UpdatedFood.getLikes(),
    UpdatedFood.getDislikes(),
    UpdatedFood.getUpdatedAt()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Update food description
router.put('/api/foods/description', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "description" = $2, "updated_at" = $3 WHERE "uuid" = $1',
  [
    _id,
    req.body[0].description,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Update food hashtags
router.put('/api/foods/hashtags', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "hashtags" = $2, "updated_at" = $3 WHERE "uuid" = $1',
  [
    _id,
    req.body[0].hashtags,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Update food photo
router.put('/api/foods/photo', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "photo" = $2, "updated_at" = $3 WHERE "uuid" = $1',
  [
    _id,
    req.body[0].photo,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Update food likes
router.put('/api/foods/likes', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "likes" = "likes" + 1, "updated_at" = $2 WHERE "uuid" = $1',
  [
    _id,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

router.put('/api/foods/likes/decrement', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "likes" = "likes" - 1, "updated_at" = $2 WHERE "uuid" = $1',
  [
    _id,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Update food dislikes
router.put('/api/foods/dislikes', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "dislikes" = "dislikes" + 1, "updated_at" = $2 WHERE "uuid" = $1',
  [
    _id,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.send(error);
     res.status(404).send();
   })
});

router.put('/api/foods/dislikes/decrement', function(req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.query('UPDATE "Food" SET "dislikes" = "dislikes" - 1, "updated_at" = $2 WHERE "uuid" = $1',
  [
    _id,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.send(error);
     res.status(404).send();
   })
});

// Delete food
router.delete('/api/foods', function (req, res, next){
  req.accepts('application/json');
  var _id = req.body[0].uuid;
  db.none('DELETE FROM "Food" WHERE "uuid" = $1', _id)
    .then(function(){
      res.status(204).send();
    })
    .catch(function (error) {
      res.status(409).send();
    });
});

module.exports = router;
