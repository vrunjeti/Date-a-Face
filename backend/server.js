var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());

// log requests to console
app.use(morgan('dev'));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// router
var router = require('./router')(app);

module.exports = app;
//app.listen(8000, '0.0.0.0');
app.listen(8000);
console.log("Listening on port 8000");
