var path = require('path');  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open a database connection
// let db = new sqlite3.Database('../flights.db');

// Open a database connection
var db = new sqlite3.Database(path.join(__dirname, '..', 'flights.db'), (err) => {
	if(err) {
		console.log(err)
	}
	else {
		console.log("Success")
	}
});

// Make a call to this route to create a flight schedule
router.post('/', function(req, res, next) {

	
})


// Make a GET request to /flights/search to search for a flight.
router.get('/search', function(req, res, next) {
	console.log(req.query)
	let takeoffCity = req.query.from
	let destinationCity = req.query.to
	let takeoffTime = req.query.date

	let sql = 'select * from flights where takeoff_city = ? and destination_city = ? and takeoff_time = ? seats_left > 0'
	res.json({duplicate: "None"})
})

module.exports = router;