var connection = require('../../connection');
var express = require('express');
var router = express.Router();

/**
* POST Route /insert 
* @params table - REQUIRED
* @params attr - REQUIRED
* Usage:
* GET /sql/insert?table=Item&attr="Girl Scout Cookies", "Thin mints","Yummy snacks for all to enjoy!",  20.00, 1
* Translated to MySQL: INSERT INTO table VALUES (attr);
*/
router.post('/insert', function(req, res) {
    var table = req.body.table,
          attr = req.body.attr;
    // catch error
    if(typeof table === 'undefined' || typeof attr === 'undefined') {
        console.log("Invalid parameters!");
    }
    else { // make query
        var q = '';
        if(table === 'Item') {
            q = 'INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES (' +  attr + ')' + ';';  
        }
        else {
            q = 'INSERT INTO ' + table + ' VALUES (' +  attr + ')' + ';';
        }
        console.log(q);  
        connection.query(q, function(err, rows, fields){
            if(!err) {
                console.log('Success: ', rows);
                res.sendStatus(200);
            }
            else {
                console.log(err);
                res.sendStatus(403);
            }
        });
    }
});

/**
* GET Route /select 
* @params table - REQUIRED
* @params attr - REQUIRED
* @params cond - OPTIONAL
* Usage:
* GET /sql/select?table=User&attr=*
* GET /sql/select?table=User&attr=*&cond=firstName='Andy'
* Translated to MySQL: SELECT attr FROM Table WHERE cond;
*/
router.get('/select', function(req, res) {
    var table = req.query.table,
          attr = req.query.attr,
          cond = req.query.cond;
    // catch error
    if(typeof table === 'undefined' || typeof attr === 'undefined') {
        console.log("Invalid parameters!");
    }
    else { // make query
        var condition = '';
        if (typeof cond != 'undefined') {
             condition = ' WHERE ' + cond;
        }
        var q = 'SELECT ' + attr + ' FROM ' + table + condition + ';';
        console.log(q)
        connection.query(q, function(err, rows, fields){
            if(!err) { 
                console.log('Returning: ', rows);
                res.send(rows);
            }
            else {
                console.log(err);
                res.sendStatus(403);
            }
        });
    }
});

/**
* PUT Route /update 
* @params table - REQUIRED
* @params attr - REQUIRED
* @params cond - OPTIONAL
* Usage:
* PUT /sql/update?table=User&attr=*
* PUT /sql/update?table=User&attr=firstName='Bob'&cond=firstName='Andy'
* Translated to MySQL: UDPATE table SET attr WHERE cond;
*/
router.put('/update', function(req, res) {
    var table = req.query.table,
          attr = req.query.attr,
          cond = req.query.cond;
    // catch error
    if(typeof table === 'undefined' || typeof attr === 'undefined') {
        console.log("Invalid parameters!");
    }
    else { // make query
        var condition = '';
        if (typeof cond != 'undefined') {
             condition = ' WHERE ' + cond;
        }
        var q = 'UPDATE ' + table + ' SET ' + attr + condition + ';';
        console.log(q);  
        connection.query(q, function(err, rows, fields) {
            if(!err) { 
                console.log('Success: ', rows);
                res.sendStatus(200);
            }
            else {
                console.log(err);
                res.sendStatus(403);
            }
        });
    }
});

/**
* DELETE Route /delete
* @params table - REQUIRED
* @params cond - REQUIRED
* Usage:
* DELETE /sql/delete?table=Item&cond=name='cookies'
* Translated to MySQL: DELETE FROM table WHERE cond;
*/
router.delete('/delete', function(req, res) {
    var table = req.query.table,
          cond = req.query.cond;

          // Need to code in the MYSQL cascade delete? Check for item delete and user delete



    // catch error
    if(typeof table === 'undefined' || typeof cond === 'undefined') {
        console.log("Invalid parameters!");
    }
    else { // make query
        var q = 'DELETE FROM ' + table + ' WHERE ' + cond + ';'
        console.log(q);  
        connection.query(q, function(err, rows, fields) {
            if(!err) { 
                console.log('Success: ', rows);
                res.sendStatus(200);
            }
            else {
                console.log(err);
                res.sendStatus(403);
            }
        });
    }
});



// SEARCH //

/**
* GET Route /search/item
* @params query
* Usage:
* GET item/search?query='something to search'
*/
router.get('/item/search/', function(req, res) {
    var searchQuery = req.query.query
    // catch error
    if(typeof searchQuery=== 'undefined') {
        searchQuery = "";
    }
    var q = "SELECT * FROM Item WHERE MATCH(name, shortDes, longDesc) AGAINST ('" + searchQuery + "')";
    console.log(q)
    connection.query(q, function(err, rows, fields){
        if(!err) { 
            console.log('Returning: ', rows);
            res.send(rows);
        }
        else {
            console.log(err);
            res.sendStatus(403);
        }
    });
});

module.exports = router;