var express = require('express');

var app = express();

// router
var router = require('./router')(app);

module.exports = app;
app.listen(3000);
console.log("Listening on port 3000");
