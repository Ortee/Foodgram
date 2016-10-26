const app = require('express')();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = pgp(process.env[config.use_env_variable]);

const root = path.join(__dirname,'/../public/');

app.use(express.static(root));
app.use(fallback('index.html', {root: root}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Mocks
const authorMock = require('./mocks/author.json')

//classes
var Food = require('./class/food');

function getTimestamp() {
  return new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000*2));
}

app.get('/api/author', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.json(authorMock);
});

// Get all food
app.get('/api/foods', function (req, res, next) {
  db.any(
    'SELECT id, username, description, hashtags, photo, likes, dislikes, created_at, updated_at FROM "Food"')
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

// Get single food
app.get('/api/foods/:id', function (req, res, next) {
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
app.post('/api/foods', function (req, res, next){
  req.accepts('application/json');
  var NewFood = new Food( 0,
    req.body[0].username,
    req.body[0].description,
    req.body[0].hashtags,
    req.body[0].photo,
    0,
    0,
    getTimestamp(),
    getTimestamp());
  db.one('INSERT INTO "Food" ("username", "description", "hashtags", "photo", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6)',
   [
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
      res.status(201).send(); //default 404
    });
});

// Update food
app.put('/api/foods/:id', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  var UpdatedFood = new Food(
    _id,
    null,
    req.body[0].description,
    req.body[0].hashtags,
    req.body[0].photo,
    req.body[0].likes,
    req.body[0].dislikes,
    null,
    getTimestamp());
  db.one('UPDATE "Food" SET "description" = $2, "hashtags" = $3, "photo" = $4, "likes" = $5, "dislikes" = $6, "updated_at" = $7 WHERE ID = $1',
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
app.put('/api/foods/:id/description', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.one('UPDATE "Food" SET "description" = $2, "updated_at" = $3 WHERE ID = $1',
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
app.put('/api/foods/:id/hashtags', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.one('UPDATE "Food" SET "hashtags" = $2, "updated_at" = $3 WHERE ID = $1',
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
app.put('/api/foods/:id/photo', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.one('UPDATE "Food" SET "photo" = $2, "updated_at" = $3 WHERE ID = $1',
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
app.put('/api/foods/:id/likes', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.one('UPDATE "Food" SET "likes" = $2, "updated_at" = $3 WHERE ID = $1',
  [
    _id,
    req.body[0].likes,
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
app.put('/api/foods/:id/dislikes', function(req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.one('UPDATE "Food" SET "dislikes" = $2, "updated_at" = $3 WHERE ID = $1',
  [
    _id,
    req.body[0].dislikes,
    getTimestamp()
  ])
   .then(function(){
     res.status(201).send();
   })
   .catch(function (error) {
     res.status(404).send();
   })
});

// Delete food
app.delete('/api/foods/:id', function (req, res, next){
  req.accepts('application/json');
  var _id = req.params.id;
  db.none('DELETE FROM "Food" WHERE ID = $1', _id)
    .then(function(){
      res.status(204).send();
    })
    .catch(function (error) {
      res.status(409).send();
    });
});

module.exports = app;
