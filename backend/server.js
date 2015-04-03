var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

// router
var router = require('./router')(app);

module.exports = app;
//app.listen(8000, '0.0.0.0');
app.listen(8000);
console.log("Listening on port 8000");
