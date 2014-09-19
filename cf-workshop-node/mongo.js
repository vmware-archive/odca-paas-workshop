var mongoose = require( 'mongoose' );
var gracefulShutdown;

// The attendee object schema
var attendeeSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	address: String,
	city: String,
	state: String,
	zipcode: String,
	email: String,
	sessions: [{
		name: String,
		date: String,
		completed: Boolean
	}]
	
});

mongoose.model('Attendee', attendeeSchema);

var vcap_services = JSON.parse(process.env.VCAP_SERVICES || '{}');
var uri = vcap_services != undefined && vcap_services.mongolab != undefined ? vcap_services.mongolab[0].credentials.uri : 'localhost:27017/cf-workshop-node';

mongoose.connect(uri, function(err, res) {
	if (err) {
		console.log('Error connecting to URI: ' + uri + ". " + err);
	}
});

//CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + uri);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});
