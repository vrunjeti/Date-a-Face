var connection = require('../../connection');
var express = require('express');
var settings = require('../../settings');
var keyword_extractor = require('keyword-extractor');

var router = express.Router();


/**
* Using crawled+newly added data, we tokenize the description of items to see how similar they are to one another.
* We then take the average price of those similar items and offer the value as a price suggestion when the
* user is adding an item (or updating).
* Needs the name, long desc, and shortDesc of the item being added.
* METHOD: POST
* PARAMS: {name, shortDes, longDes}
* Returns; JSON resposne with value
*/
router.post('/pricesuggestion', function (req, res, next) {
    var maxLength = 8;
    var originalName = "";
    var originalShort = "";
    var originalLong = "";
    originalName = req.body.name;
    originalShort = req.body.shortDes;
    originalLong = req.body.longDesc;
    console.log(req.body.name);
    // tokenize /extract :
    tokensName = keyword_extractor.extract(originalName, {language:"english",remove_duplicates:true, returned_changed_case:true, remove_digits:true});
    tokensShort = keyword_extractor.extract(originalShort, {language:"english",remove_duplicates:true, returned_changed_case:true, remove_digits:true});
    tokensLong = keyword_extractor.extract(originalLong, {language:"english",remove_duplicates:true, returned_changed_case:true, remove_digits:true});
    if(tokensName.length > maxLength) {
        tokensName = tokensName.slice(0,maxLength);
    }
    if(tokensShort.length > maxLength) {
        tokensShort = tokensShort.slice(0,maxLength);
    }
    if(tokensLong.length > maxLength) {
        tokensLong = tokensLong.slice(0,maxLength);
    }
    var searchQuery = "";
    for(i = 0; i < tokensShort.length; i++) {
        searchQuery += tokensShort[i] + ' ';
    }
    for(i = 0; i < tokensLong.length; i++) {
        searchQuery += tokensLong[i] + ' ';
    }
    for(i = 0; i < tokensName.length; i++) {
        searchQuery += tokensName[i] + ' ';
    }
    if(searchQuery.length == 0) {
        searchQuery = "";
    }
    searchQuery = searchQuery.trim();

    // A really psuedo-like (hacky) way to get "similar" items. Will improve...
    var q = "SELECT COUNT(*) AS count, SUM(price) AS sum, AVG(price) AS avg , MAX(price) AS max, MIN(price) AS min FROM Item WHERE MATCH(name, shortDes, longDesc, phonetic) AGAINST ('" + searchQuery + "')";
    //var q_med = "SELECT x.price from Item x, Item y GROUP BY x.price HAVING SUM(SIGN(1-SIGN(y.price-x.price)))/COUNT(*) > .5 LIMIT 1";
    var q_med = "SELECT x.price AS median from Item x, Item y WHERE MATCH(x.name, x.shortDes, x.longDesc, x.phonetic) AGAINST ('" + searchQuery + "') GROUP BY x.price HAVING SUM(SIGN(1-SIGN(y.price-x.price)))/COUNT(*) > .5 LIMIT 1";
    console.log(q);
    // gets the different aggregates
    connection.query(q, function (err, rows) {
        if(err) {
            console.log("Unable to make suggestion! 1");
            res.json({message: "Price Suggestion Unavailable"});
        }
        else {
            console.log("Suggestion Provided! 2");
            var count = rows[0].count;
            var sum = rows[0].sum;
            var avg = rows[0].avg;
            var max = rows[0].max;
            var min = rows[0].min;
            // gets the median
            connection.query(q_med, function (err, rows) {
                if(err) {
                    console.log("Unable to make suggestion! 3");
                    res.json({message: "Price Suggestion Unavailable"});
                }
                else {
                    if(rows.length == 0) {
                        console.log("Empty");
                        res.json({message: "Price Suggestion Unavailable"});
                    }
                    else{
                        var median = rows[0].median;
                        // compute a suggestion
                        var temp = parseFloat(median);
                        if(isNaN(temp)) {
                            console.log("Unable to make suggestion!");
                            res.json({message: "Price Suggestion Unavailable 4"});
                        }
                        else {
                            var priceSuggestion = median + ((avg / max) * (sum / min))/2;
                            console.log("Sending a Suggestion!");
                            res.json({message: priceSuggestion});
                        }
                    }
                }
            });
        }
    });
}); 


module.exports = router;