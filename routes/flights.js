var path = require('path');  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open a database connection
// let db = new sqlite3.Database('../flights.db');

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

// Make a call to this route to create a flight schedule
router.post('/', function(req, res, next) {

	
})



// Make a GET request to /flights/search to search for a flight.
router.get('/search', function(req, res, next) {

	let sql = 'select flight_number, takeoff_date, takeoff_time, takeoff_city, takeoff_airport, takeoff_terminal, destination_city, flight_duration from flights where takeoff_city = ? and destination_city = ? and takeoff_date = ? and seats_left > 0'
	
	// db.get(sql, [req.query.from, req.query.to, req.query.date], (err, row) => {
	// To get only one row, use db.get instead of db.all
	db.all(sql, [req.query.from, req.query.to, req.query.date], (err, rows) => {
		if(err){

			// TODO: Log the error here
			console.log(err)
			res.json({error: "Your request could not be completed at the moment. Try again in a few minutes"})
		}
		else {
			if(rows){
				console.log(rows)
				res.json({success: "Pick a flight"})
			}
			else{
				console.log(rows)
				let takeoff = req.query.from; let destination = req.query.to
				res.json({ message: `No flights from ${takeoff} to ${destination} on the given date` })
			}
		}
	})
})

module.exports = router;