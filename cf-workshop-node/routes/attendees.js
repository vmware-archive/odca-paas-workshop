var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var attendee = mongoose.model('Attendee');

router.get('/list', function(req, res) {
	attendee.find(function(e, attendees, count) {
		res.render('attendees', {"attendees": attendees});
	});
});

router.get('/:attendee_id/sessions', function(req, res) {
	attendee.findOne({_id: req.params.attendee_id}, {}, function(e, attendee) {
		res.render('sessions', {"attendee": attendee});
	});
});

module.exports = router;
