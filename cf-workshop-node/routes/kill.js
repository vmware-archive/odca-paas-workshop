var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	process.exit(-1);
});

module.exports = router;
