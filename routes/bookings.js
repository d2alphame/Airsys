// Contains routes for handling bookings.
  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open a database connection
let db = new sqlite3.Database('../flights.db');


// Make a request to this route make a booking 
router.post('/', function(req, res, next) {
	console.log(req.body)
	
	// Select the appropriate flight from the flight table
	let sql = 'select * from flights where flight_number = ?'
	db.get(sql, [req.body.flight], (err, row) => {
		if(err) {
			// TODO: Log error here
			console.log(err)
		}
		else {
			if(row) {
				const cols = ["A", "B", "C", "D"]
				let seatRow = row.next_row
				let seatCol = cols[row.next_col]
				let nextRow = row.next_row++
				let nextCol = row.next_col++
				nextCol = nextCol > 3 ? 0 : nextCol
				let seatsLeft = row.seats_left--
			}
			else {

			}
		}
	})
})

// Make a request to this route to cancel a booking
router.post('/remove/:id', function(req, res, next) {
	
})
module.exports = router;