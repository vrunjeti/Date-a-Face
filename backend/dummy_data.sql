USE sail_db;

INSERT INTO User (firstName, lastName, email, phone, rating, password) VALUES ("Arpit", "Khanuja", "khanuja2@illinois.edu", "1234567890",  NULL, "");
INSERT INTO User (firstName, lastName, email, phone, rating, password) VALUES ("Andy", "Vuong", "avuong3@illinois.edu", "11234911",  NULL, "");
INSERT INTO User (firstName, lastName, email, phone, rating, password) VALUES ("Michelle", "Zheng", "mzheng6@illinois.edu", "1234567890",  NULL, "");
INSERT INTO User (firstName, lastName, email, phone, rating, password) VALUES ("Varun", "Munjeti", "vrunjeti@illinois.edu", "1234567891",   NULL, "");
INSERT INTO User (firstName, lastName, email, phone, rating, password) VALUES ("Varuna", "Patel", "ilovevarun@illinois.edu", "1234567891",   NULL, "");

INSERT INTO Location (userId, city, state, curAddress) VALUES (1, "Urbana", "Illinois", "1109 W Illinois St");
INSERT INTO Location (userId, city, state, curAddress) VALUES (2, "Champaign", "Illinois", "491 E Armory Ave");
INSERT INTO Location (userId, city, state, curAddress) VALUES (3, "Champaign", "Illinois", "308 E Gregory Dr");
INSERT INTO Location (userId, city, state, curAddress) VALUES (4, "Champaign", "Illinois", "513 E Peabody Dr");
INSERT INTO Location (userId, city, state, curAddress) VALUES (5, "Savoy", "Illinois", "1174 E Curtis Rd");

INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("Girl Scout Cookies", "Thin mints","Yummy snacks for all to enjoy!",  20.00, 1);
INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("Astros A40's", "New head phones for X-Box one", "Selling Astros A40's, Xbox One edition. Asking for $170 or best offer. They work perfectly. Used them like 5 times. Highly conformable headset.", 400.00, 2);
INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("MacBook Air", "Barely used, no scratches. Like new!", "Like-new MacBook Air MD760LL/A 13-inch 128 GB for $600. Bought on March 11, 2014.", 600.00, 3);
INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("Chair", "Wooden and sturdy","Wooden sturdy mahogany chair for studying",  120.00, 4);
INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("Dishware", "Spoons and cups", "Bought from target and haven't been used yet!", 10.00, 5);

INSERT INTO Item (name, shortDes, longDesc, price, userId) VALUES ("IPhone Case", "Barely used, no scratches. Like new!", "Perfect for your IPhone. I have two. One for the 5 and one for the 6. Both for 40 OBO.", 40.00, 1);

INSERT INTO Category (itemId, categoryName) VALUES (1, "Food");
INSERT INTO Category (itemId, categoryName) VALUES (2, "Electronics");
INSERT INTO Category (itemId, categoryName) VALUES (3, "Electronics");
INSERT INTO Category (itemId, categoryName) VALUES (4, "Misc");
INSERT INTO Category (itemId, categoryName) VALUES (5, "Electronics");
