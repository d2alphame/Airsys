var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var path = require('path'); 

// Open a database connection
var db = new sqlite3.Database(path.join(__dirname, '..', 'flights.db'), (err) => {
	if(err) {
		// TODO: Use proper logging
		console.log(err)
	}
	else {
		// TODO: Use proper logging later
		console.log("Success")
	}
});

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

module.exports = router;
