/**
* This is part of our super advanced moneytentacles function. This little guy scoops all the little fishies from their homes
* and puts them in the fine modern-day rows of solitude that is our database.
*/
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = require('./connection');
var meta= require('./metaphone');

var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Our lovelies
var friends = {
    books: "https://chambana.craigslist.org/bks",
    electronics: "https://chambana.craigslist.org/ele",
    arts: "https://chambana.craigslist.org/art",
    games: "https://chambana.craigslist.org/vgm"
};

var masterId = 1;

// change me
funkyMagic(friends.games, 0)
//

function funkyMagic(victim, n) {
    request(victim, function (err, res, doc) {
        if(err) {
            console.log("Couldn't eat this guy...");
            return;
        }
        else {
            var $ = cheerio.load(doc);
            $('.row .i').each(function (i, element) {
                var goodies = $(this).attr('href');
                goodies = goodies.split("/");
                if(goodies.length < 4) {
                    var hook = goodies[1];
                    var sinker = goodies[2];
                    unicornBlast(victim, sinker);
                }
            });
        }
    });
}

// Send this fish to the fishery and give me its meat!
function unicornBlast (realm, sinker) {
    var fish = realm + '/' + sinker;
    console.log("Grabbing: " + fish);
    request(fish, function (err, res, doc) {
        if (err) {
            console.log('DEADBEEF');
            return;
        }
        else if(res.statusCode === 404) {
            console.log('DEADFISH');
            return;
        } 
        else {
            //console.log("Extraction");
            var $ = cheerio.load(doc);
            var elementTitle = $('.postingtitle');
            var elementPost = $('#postingbody');
            var title = ((elementTitle.text()).trim()).replace(/(\r\n|\n|\r)/gm,"");
            var post = ((elementPost.text()).trim()).replace(/(\r\n|\n|\r)/gm,"");

            var price = 42; // the answer? or the question? ...default
            if(title.indexOf("$") != -1) {
                var new_price = title.substring(title.indexOf("$"), title.length);
                new_price = new_price.replace(/\D/g,'').replace(" ", "");
                price = parseFloat(new_price);
            }
            var shortPost = "";
            post = post.replace(/[^a-zA-Z ]/g, "")
            //post = post.replace("'","\'");
            if(post.length < 12) {
                shortPost = post.substring(0, post.length);
            }
            else {
                shortPost = post.substring(0,10);
            }
            email = "public@sailbought.com"
            //post = post + " \nContact: " + email;
            title = title.replace(/[^a-zA-Z ]/g, "")
            var longphrase = meta.metaphrase(title + ' ' + shortPost + ' ' + post);
            var swordfish = "INSERT INTO Item(name, shortDes, longDesc, price, userid, phonetic) VALUES ("+'\''+title+'\','+'\''+shortPost+'\','+'\''+post+'\','+price+','+masterId+',\''+longphrase+'\''+");";
            console.log(swordfish);
            connection.query(swordfish,function (err, rows) {
                if(err) {
                    console.log("no can do");
                    console.log(err);
                }
                else {
                    //console.log('success');
                }
            });
        }
    });
}

module.exports = app;
app.listen(8080);
console.log("MoneyTentacles is live ;)");