var mysql = require('mysql');

// connect on start
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a',
    database : 'sail_db'
});
connection.connect();
console.log("Connected to mysql db");

module.exports = connection;
