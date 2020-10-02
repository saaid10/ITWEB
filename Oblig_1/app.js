const http = require('http');
const httpStatus = require('http-status-codes');
const path = require('path');
const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);


module.exports = app;