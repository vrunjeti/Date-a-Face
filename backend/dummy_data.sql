USE sail_db;

insert into User (firstName, lastName, email, phone, profileUrl, rating) values ("Arpit", "Khanuja", "khanuja2@illinois.edu", "1234567890", "url", 2.0);
insert into User (firstName, lastName, email, phone, profileUrl, rating) values ("Varuna", "Patel", "ilovevarun@gmail.com", "1234567891", "url2", 10.0);
insert into User (firstName, lastName, email, phone, profileUrl, rating) values ("Andy", "Vuong", "avuong3@illinois.edu", "11234911", "url3", NULL);

insert into Item (name, shortDes, longDesc, price, userId) values ("Girl Scout Cookies", "Thin mints","Yummy snacks for all to enjoy!",  20.00, "khanuja2@illinois.edu");
insert into Item (name, shortDes, longDesc, price, userId) values ("Astros A40's", "New head phones for X-Box one", "Selling Astros A40's, Xbox One edition. Asking for $170 or best offer. They work perfectly. Used them like 5 times. Highly conformable headset.", 100.00, "ilovevarun@gmail.com");
insert into Item (name, shortDes, longDesc, price, userId) values ("MacBook Air", "Barely used, no scratches. Like new!", "Like-new MacBook Air MD760LL/A 13-inch 128 GB for $600. Bought on March 11, 2014.", 600.00, "ilovevarun@gmail.com");

insert into Location (userId, city, state, curAddress) values ("khanuja2@illinois.edu", "Los Angeles", "California", "1234 ItsSunny Dr.");
insert into Location (userId, city, state, curAddress) values ("avuong3@illinois.edu", "Naperville", "Illinois", "1234 ItsSnowing Ln.");
insert into Location (userId, city, state, curAddress) values ("ilovevarun@gmail.com", "Seattle", "Washington", "1234 ItsRaining St.");