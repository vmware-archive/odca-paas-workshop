// ensure that you have mongod running or mongolab service setup
// load this data using the following command line: 
// 'mongo localhost:27017/cf-workshop-node data.js'
// 'mongo ds035300.mongolab.com:35300/CloudFoundry_ri5de6se_3fcsnitp data.js'   << not working
// or from shell "load ('data.js')"
db.attendees.drop();
db.attendees.insert({"firstname": "Brian", "lastname": "Jimerson", "address": "123 Main St.", "city": "Akron", "state": "OH", "zipcode": "44313", "email": "bjimerson@pivotal.io", "sessions": [ { "name": "Session 1", "date": "2014-09-01", "completed": true }, { "name": "Session 2", "date": "2014-08-06", "completed": false} ]});
db.attendees.insert({"firstname": "Sally", "lastname": "Struthers", "address": "456 Oak St.", "city": "Akron", "state": "OH", "zipcode": "44313", "email": "sstruthers@gmail.com", "sessions": [ ]});
db.attendees.insert({"firstname": "John", "lastname": "Doe", "address": "1111 Peach St.", "city": "Akron", "state": "OH", "zipcode": "44313", "email": "jdoe@gmail.com", "sessions": [ ]});
