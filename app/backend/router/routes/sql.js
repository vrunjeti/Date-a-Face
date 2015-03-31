var connection = require('../../connection');
var express = require('express');
var router = express.Router();

// INSERT INTO table VALUES attr
// example: POST /sql/insert/User/'Joe','Mama','yoyoma@gmail','7737189210','luigi',99
router.post('/insert/:table/:attr', function(req, res) {
    var table = req.params.table;
    var attr = req.params.attr;
    var q = 'INSERT INTO ' + table + ' VALUES (' +  attr + ')' + ';';
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
});

// SELECT attr FROM table WHERE cond
// example: GET /sql/select/User/*/firstName='Bob'
// cond is optional, if no cond parameter is included, WHERE clause will not be used.
router.get('/select/:table/:attr/:cond?', function(req, res) {
    var table = req.params.table;
    var attr = req.params.attr;
    var cond = "";
    if (req.params.cond) {
        cond = ' WHERE ' + req.params.cond;
    }
    var q = 'SELECT ' + attr + ' FROM ' + table + cond + ';';
    console.log(q);
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

// UDPATE table SET attr WHERE
router.put('/update/:table/:attr/:cond?', function(req, res) {
    var table = req.params.table;
    var attr = req.params.attr;
    var cond = "";
    if (req.params.cond) {
        cond = ' WHERE ' + req.params.cond;
    }
    var q = 'UPDATE ' + table + ' SET ' + attr + cond + ';';
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
});

// DELETE FROM table WHERE cond
// example: DELETE /sql/delete/User/firstName='Bob'
router.delete('/delete/:table/:cond', function(req, res) {
    var table = req.params.table;
    var cond = req.params.cond;
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
});


module.exports = router;