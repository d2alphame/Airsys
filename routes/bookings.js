// Contains routes for handling bookings.
  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto')			// This will be necessary when generating booking number

// Open a database connection
let db = new sqlite3.Database('../flights.db');


// Make a request to this route make a booking 
router.post('/', function(req, res, next) {
	console.log(req.body)
	
	// Select the appropriate flight from the flight table
	let sql = 'select * from flights where flight_number = ?'
	const { firstName, lastName, email, phone, flight } = req.body
	db.get(sql, [flight], (err, row) => {
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
				
				sql = 'update flights next_row = ?, next_col = ?, seats_left = ? where flight_number = ?'
				db.run(sql, [nextRow, nextCol, seatsLeft, flight], (upErr) => {
					if(upErr) {
						// TODO: Properly log error later
						console.log(upErr)
					}
					else {
						// Once the seat has been reserved, do the actual booking
						sql = 'insert into bookings (flight_id, booking_number, flight_number, seat_number, first_name, last_name, middle_name, email, phone) values (?, ?, ?, ?, ?, ?, ?, ?, ?)'
						let bookingNumber = crypto.randomBytes(4).toString('hex')
						let seatNumber = "" + seatRow + seatCol
						db.run(sql, [flight, bookingNumber, flight, seatNumber, firstName, lastName, "", req.body.email, req.body.phone], (insErr) => {
							if(insErr) {
								// TODO: Proper logging
								console.log(insErr)
								res.json({ error: "Your request could not be completed"})
							}
							else {
								res
							}
						})
					}
				})
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