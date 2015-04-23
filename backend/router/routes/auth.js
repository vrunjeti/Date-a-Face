var connection = require('../../connection');
var express = require('express');
var jwt = require('jwt-simple');
var jwt2 = require('jsonwebtoken');
var settings = require('../../settings');

var router = express.Router();

/**
* DELETE /profile/item
* Params: {itemid} <- needs the itemid so we know which item to delete, this id should be stored with the item on the view.
* Returns a JSON object.
*/
router.delete('/profile/item', isAuthenticated, function (req, res, next) {
    console.log("Deleting Item!");
    var item_id = req.query.itemid;
    var q_del = "DELETE FROM Item WHERE id="+ item_id +';';
    connection.query(q_del, function (err, rows) {
        if(err) {
            res.json({message: "Error Occured"});
        }
        else {
            res.json({message: "Success"});
        }
    });
});

/**
* POST /profile/item
* params: {name, shortDes, longDesc, price}
* You only need to pass the above parameters into the request
*/
router.post('/profile/item', isAuthenticated ,function (req, res, next) {
    console.log("Inserting Item");
    var userid = req.userid;
    var name = req.body.name;
    var shortDes = req.body.shortDes;
    var longDesc = req.body.longDesc;
    var price = req.body.price;
    var q_add = "INSERT INTO Item(name, shortDes, longDesc, price, userid) VALUES ("+'\''+name+'\','+'\''+shortDes+'\','+'\''+longDesc+'\','+price+','+userid+");";
    console.log(q_add);
    connection.query(q_add, function (err, rows) {
        if(err) {
            res.json({message: "Error Occured"});
        }
        else {
            console.log(rows);
            res.json({message: "Success", id: rows});
        }
    });
});

/**
* PUT /profile/item
* Params: {itemid} <- needs the itemid so we know which item to UPDATE
* @params attr - REQUIRED
* Usage:
* PUT /sql/update?attr=firstName='Bob'
* Returns a JSON object
*/
router.put('/profile/item', isAuthenticated, function (req, res, next) {
    console.log("Updating Item!");
    var itemid = req.body.item_id;
    var q_up = "UPDATE Item SET name=\'"+req.body.name+'\', shortDes=\''+req.body.shortDes+'\', longDesc=\''+req.body.longDesc+'\', price='+req.body.price+' WHERE id='+itemid+';';
    console.log(q_up);
    connection.query(q_up, function (err, rows) {
        if(err) {
            console.log(err);
            res.json({message: "Error Occured"});
        }
        else {
            res.json({message: "Success"});
        }
    });
});

/**
* DELETE /profile/all
* No params are needed, deletes the whole account.
* Returns a JSON object. You should probably redirect on success and call localStorage.clear(); to logout the user.
*/
router.delete('/profile/all', isAuthenticated, function (req, res, next) {
    console.log("Deleting Item!");
    var id = req.userid;
    var q_del = "DELETE FROM User WHERE id="+ id +';';
    connection.query(q_del, function (err, rows) {
        if(err) {
            res.json({message: "Error Occured"});
        }
        else {
            res.json({message: "Success"});
        }
    });
});

/**
* GET /profile/logout
* Returns a JSON object. Should redirect on http request success as well as call localStorage.clear(); before hand.
*/
router.get('/profile/logout', isAuthenticated, function (req, res, next) {
        console.log("Logging out!");
        res.json({message: "Log Out"})
});

/**
* GET /profile
* Returns the user's info. NOTE: No id param needs to be given because this function gets the id automatically. You just need to call it.
*/
router.get('/profile', isAuthenticated, function (req, res, next) {
    console.log("Getting Profile!");
    var id = req.userid;
    var q_info = "SELECT * FROM User WHERE  id="+ id +';'; // get all the user's info
    connection.query(q_info, function (err, rows) {
        if(err) {
            res.json({message: "Error Occured"});
        }
        else {
            console.log(rows[0]);
            res.json({message: "Success", payload: rows[0]});
        }
    });
});

/**
* GET /profile/items
* Returns all of the items for a user. NOTE: No id param needs to be given because this function gets the id automatically. You just need to call it.
*/
router.get('/profile/items', isAuthenticated, function (req, res, next) {
    console.log("Getting items!");
    var id = req.userid;
    var q_items =  "SELECT Item.* FROM Item INNER JOIN User ON Item.userId=User.id WHERE User.id="+ id +';'; // get all of the user's associated items
    connection.query(q_items, function (err, rows) {
        if(err) {
            res.json({message: "Error Occured"});
        }
        else {
            console.log(rows);
            res.json({message: "Success", payload: rows});
        }
    });
});

////// Other stuff //////
router.get('/test', isAuthenticated, function (req, res, next) {
    console.log("You're In!");
    console.log(req.userid);
    res.json({message: "Success"});
});

router.post('/signup', function (req, res, next) {
    console.log('Signing Up:');
    var q = "SELECT * FROM User WHERE email = ? ;"
    connection.query(q, connection.escape(req.body.email), function (err, rows, fields) {
        if(err) {
            console.log("Sign Up: Error Occured");
            console.log(err);
            res.json({message: "Error Occured"});
        }
        else {
            if(rows.length > 0) {
                console.log("User Exists");
                res.json({message: "User Exists"});
            }
            else {
                var fName = req.body.firstName;
                var lName = req.body.lastName;
                var email = req.body.email;
                var pass = req.body.password;
                var phone = req.body.phone;
                var q = "INSERT INTO User(firstName, lastName, email, password, phone) VALUES ("+'\''+fName+'\','+'\''+lName+'\','+'\''+email+'\','+'\''+pass+'\','+'\''+phone+'\''+");";
                console.log(q);
                connection.query(q, function (err, results) {
                    if(err) {
                        console.log("Sign Up (sql): Error Occured");
                        res.json({message: "Error Occured"});
                    }
                    else {
                        console.log('Sign Up: Success');
                        var user = results.insertId;
                        var payload = {
                            id : user,
                            email : req.body.email
                        };
                        var token = jwt.encode(payload, settings.secret);
                        res.json({message: "Success", token: token});
                    }
                });
            }
        }
    });
});

router.post('/login', function (req, res, next) {
    console.log('Loggin In:');
    var q = "SELECT * FROM User WHERE email= "+connection.escape(req.body.email)+';';
    //console.log(connection.escape(req.body.email));
    connection.query(q, function (err, rows, fields) {
        if(err) {
            console.log("Log in: Error Occured");
            console.log(err);
            res.json({message: "Error Occured"});
        }
        else {
            console.log(rows);
            if(rows.length) {
                var user = rows[0];
                if(user.password === req.body.password) {
                    console.log("Log In: Success");
                    var payload = {
                        id : user.id,
                        email : user.email
                    };
                    var token = jwt.encode(payload, settings.secret);
                    res.json({message: "Success", token: token});
                }
                else {
                    console.log("Log In: Password Failed");
                    res.json({message: "Error Occured"});
                }
            }
            else {
                console.log("Log In: Doesn't Exist");
                res.json({message: "Error Occured"});
            }
        }
    });
});

module.exports = router;

function isAuthenticated (req, res, next) {
    bearerHeader = req.headers["authorization"];
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    var decoded = jwt.decode(req.token, settings.secret);
    console.log(decoded);
    var q = "SELECT * FROM User WHERE id = ? ;"
    connection.query(q, decoded.id ,function (err, rows, fields) {
        if(rows.length) {
            console.log("Auth Success");
            req.userid = decoded.id;
            return next();
        }
        console.log("Auth Error");
        return res.json({message: "Error Occured"});
    });
}