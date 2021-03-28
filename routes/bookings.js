// Contains routes for handling bookings.
  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto')			// This will be necessary when generating booking number
var path = require('path')

// Open a database connection
var db = new sqlite3.Database(path.join(__dirname, '..', 'flights.db'), (err) => {
	if(err) {
		// TODO: Use proper logging
		console.log(err)
	}
	else {
		// TODO: Use proper logging later
		// console.log("Success")
	}
});


// Make a request to this route make a booking 
router.post('/', function(req, res, next) {
	
	// Select the appropriate flight from the flight table
	let sql = 'select * from flights where flight_number = ?'
	const { firstName, lastName, middleName, email, phone, flight } = req.body
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
				let nextRow = row.next_row; nextRow++
				let nextCol = row.next_col; nextCol++
				nextCol = nextCol > 3 ? 0 : nextCol
				let seatsLeft = row.seats_left; seatsLeft--

				sql = 'update flights set next_row = ?, next_col = ?, seats_left = ? where flight_number = ?'
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
						db.run(sql, [flight, bookingNumber, flight, seatNumber, firstName, lastName, middleName, email, phone], (insErr) => {
							if(insErr) {
								// TODO: Proper logging
								console.log(insErr)
								res.json({ error: "Your request could not be completed"})
							}
							else {
								res.json({
									bookingNumber,
									seatNumber,
									flight,
									firstName,
									lastName,
									middleName,
									email,
									phone
								})
							}
						})
					}
				})
			}
			else {
				// TODO: Use a proper logging
				console.log(row)
				res.json({message : "Your request could not be completed"})
			}
		}
	})
})

// Make a request to this route to cancel a booking
router.post('/remove/:id', function(req, res, next) {
	
})
module.exports = router;