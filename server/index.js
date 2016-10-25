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

app.get('/api/author', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(authorMock));
});

app.get('/api/foods', function (req, res) {
  db.any(
    'SELECT user, description, hashtags, photo, likes, dislikes, created_at FROM "Food"')
    .then(function (data) {
      res.setHeader('Content-Type', 'application/json');
      Foods = data.map((elem) => new Food(
        elem.user,
        elem.description,
        elem.hashtags,
        elem.photo,
        elem.likes,
        elem.dislikes));
      res.send(JSON.stringify(Foods));
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

app.post('/api/foods', function (req, res){
  req.accepts('application/json');
  var NewFood = new Food(
    req.body[0].user,
    req.body[0].description,
    req.body[0].hashtags,
    req.body[0].photo,
    req.body[0].likes,
    req.body[0].dislikes);
  db.one('INSERT INTO "Food" (user, description, hashtags, photo, likes, dislikes, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (user) DO NOTHING RETURNING id',
   [
     NewFood.getUser(),
     NewFood.getDescription(),
     NewFood.getHashtags(),
     NewFood.getPhoto(),
     NewFood.getLikes(),
     NewFood.getDislikes(),
     getTimestamp(),
     getTimestamp()
   ])
    .then(function(){
      res.status(201).send();
    })
    .catch(function (error) {
      res.status(404).send();
    });
});

app.delete('/api/foods', function (req, res){
  req.accepts('application/json');
  db.none('DELETE FROM "Food" WHERE ID = $1', req.body[0].id)
    .then(function(){
      res.status(204).send();
    })
    .catch(function (error) {
      res.status(409).send();
    });
});

module.exports = app;
