MongoHandle = require('mongodb').MongoClient;
MongoServer = require('mongodb').Server;

var gracefulShutdown;

var mongoEnv = {};

if(process.env.VCAP_SERVICES){
	  var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
	  var mongoEnv = vcap_services.mongolab[0].credentials.uri;
	  mongoEnv = {
			"hostname":"ds049898.mongolab.com",
			"user": "CloudFoundry_ri5de6se_mu7oe30a_p6211csq",
			"password" : "SWVhIbX_IE8a27YUhcoxqu4TMXn0Glv3",
			"port" : 49898,
			"db" : "CloudFoundry_ri5de6se_mu7oe30a"
		}
	}
	else {
	  mongoEnv = {
	    "hostname":"localhost",
	    "port": 27017,
	    "username":"",
	    "password":"", 
	    "name":"",
	    "db":""
	  }
	}


var generate_mongo_url = function(obj){

	
	  obj.hostname = (obj.hostname || 'localhost');
	  obj.port = (obj.port || 27017);
	  obj.db = (obj.db || 'test');

	  if(obj.username && obj.password){
	    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
	  }
	  else{
	    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
	  }
	}

var mongourl = generate_mongo_url(mongoEnv);
var collections;

//Open the connection with database now..
console.log("mongo: " + mongoEnv);
console.log("mongourl: " + mongourl);
console.log("mongo.hostname: " + mongoEnv.hostname);
console.log("mongo.port: " + mongoEnv.port);

var mongohandle = new MongoHandle(new MongoServer(mongoEnv.hostname,mongoEnv.port));
mongohandle.open(function(err,mongohandle){
	if (!err) {
		console.log("Connected to database");
		if(!mongohandle){
			console.error("Oops ! MongoDB is not available..Start it");
			process.exit(1);
		}
		// mongolabs manages database and we have only user rights.
		var db;
		if (process.env.VCAP_SERVICES) {
			console.log("Setting db to CloudFoundry_ri5de6se_mu7oe30a");
			db = mongohandle.db("CloudFoundry_ri5de6se_mu7oe30a");
		} else {
			console.log("Setting db to PaaSWorkshop");
			db = mongohandle.db("PaaSWorkshop");		
		}
		if (mongoEnv.user) {
			db.authenticate(mongoEnv.user, mongoEnv.password, function() {
				if (!err) {
					console.log("Authenticated");
				} else {
					console.log("Error in authentication.");
					console.log(err);
				}
			});
		}
	}
	collections = new Collections(db);
});
	
exports.name=collections;
