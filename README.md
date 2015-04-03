# Date-a-Face
CS 411 Best Group

## Running the app
- Make sure you install node, bower, ruby, compass, and npm if you haven't.
- Install the dependencies by running:
```
npm install
bower install
```
- Start mysql and initiate the database (see below).
```
mysql -p
```
-  Start the server
```
node server.js
```
- Start the app
```
grunt serve
```

## Initiating the database on your machine
1. Start mysql
2. Type (without the quotes):
  * 'source ~/path/to/init.sql' on linux/mac
  * 'source C://path/to/init.sql' on Windows
3. Type:
```
source ~/path/to/dummy_data.sql'
```
to generate the dummy data
