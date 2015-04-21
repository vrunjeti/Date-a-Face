var connection = require('../../connection');
var express = require('express');
var jwt = require('jwt-simple');
var settings = require('../../settings');

var router = express.Router();

// Need a profile page that shows all the users items, user's information and has options
// to mark the item as deleted and delete the user account themselves
// delete item
// delete user
// mark as sold

// fix search
// notifications to login and additems and addusers

router.get('/test', isAuthenticated, function (req, res, next) {
    console.log("You're In!");
    console.log(req.userid);
    res.json({message: "Success"});
});

router.get('/profile', isAuthenticated, function (req, res, next) {
    console.log("Getting Profile!");
    console.log(req.userid);
    var id = req.userid; // we'll use this to identify our loggedin user
    var q_info = "SELECT * FROM User WHERE  id="+ id +';'; // get all the user's info
    connection.query(q_info, function (err, rows) { 
        console.log(rows[0]);
        res.json({message: "Yes"});
    });
});

router.get('/profile/items', isAuthenticated, function (req, res, next) {
    console.log("Getting items!");
    console.log(req.userid);
    var id = req.userid; // we'll use this to identify our loggedin user
    var q_items =  "SELECT * FROM Item INNER JOIN User ON Item.userId=User.id WHERE User.id="+ id +';'; // get all of the user's associated items
    console.log(q_items);
    connection.query(q_items, function (err, rows) { 
        console.log(rows[0]);
        res.json({message: "Yes"});
    });
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
            if(rows.length) {
                console.log("User Exists");
                res.json({message: "User Exists"});
            }
            else {
                var q = 'INSERT INTO User (firstName, lastName, email, password, phone) VALUES ( ?, ?, ?, ?, ? );'; 
                connection.query(q, [connection.escape(req.body.firstName), connection.escape(req.body.lastName), connection.escape(req.body.email), connection.escape(req.body.password), connection.escape(req.body.phone)] , function (err, rows) {
                    if(err) {
                        console.log("Sign Up (sql): Error Occured");
                        res.json({message: "Error Occured"});
                    }
                    else {
                        console.log('Sign Up: Success');
                        var user = rows[0];
                        var payload = {
                            id : user.id,
                            email : user.email
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
    console.log("Decoded: ");
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