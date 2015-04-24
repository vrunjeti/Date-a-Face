var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');
var meta= require('./metaphone');

var app = express();
app.use(cors());

// log requests to console
app.use(morgan('dev'));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: 'mzheng6',
  api_key: '421439327227976',
  api_secret: '07dIwDgDt2dgoyprWYuvJ6xoa5I'
});

// router
var router = require('./router')(app);

//console.log(meta.metaphrase("mcbuuk macbook"));

module.exports = app;
//app.listen(8000, '0.0.0.0');
app.listen(8000);
console.log("Listening on port 8000");
