const app = require('express')();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const root = path.join(__dirname,'/../public/');

var foodApi = require('./api/foods');

app.use(express.static(root));
app.use(fallback('index.html', {root: root}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', foodApi);


module.exports = app;