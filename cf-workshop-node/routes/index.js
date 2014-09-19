var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var now = new Date();
	var port;
	var vcapApplication;
	var vcapServices;
	if (process.env.PORT) {
		port = process.env.PORT;
		vcapApplication = JSON.parse(process.env.VCAP_APPLICATION || '{}');
		vcapServices = process.env.VCAP_SERVICES;
	}	else {
		port = 3000;
		vcapApplication = {
				"instance_id" : "0",
				"instance_index": "0",
				"started_at" : now
		}
		vcapServices = "localhost:27017/cf-workshop-node";
				
	}

	res.render('index', { title: 'EXAMPLE application for PCF', now: now.toLocaleString(), port: port, vcapApplication: vcapApplication, vcapServices: vcapServices });
});

module.exports = router;
