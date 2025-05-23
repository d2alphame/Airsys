var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
var path = require('path'); 
const { forEach } = require('../cities');

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

router.get('/', function(req, res, next) {
   
  let fsql = 'select flight_number flightNumber, takeoff_date takeoffDate, takeoff_time takeoffTime, takeoff_city takeoffCity, takeoff_airport takeoffAirport, takeoff_terminal takeoffTerminal, destination_city destinationCity, flight_duration flightDuration from flights'
  db.all(fsql, (err, flights) => {
    if(err) {
      console.log(err)
      res.json({error: "Your request could not be completed"})
    }
    else {
      if(flights.length) {
        let bsql = 'select booking_number bookingNumber, seat_number seatNumber, first_name firstName, last_name lastName, middle_name middleName,  email, phone, takeoff_city takeoffCity, destination_city destinationCity, takeoff_date takeoffDate from bookings inner join flights on flights.flight_id = bookings.flight_id'
        db.all(bsql, (berr, bookings) => {
          if(berr) {
            console.log(berr) 
            res.json({error: "Your request could not be completed"})
          }
          //else{
            //if(bookings.length) {
              res.render('admin', {flights, bookings})
            //}
          //}
        })
      }
    }
  })

});


    // Function to convert the date from yyyy-mm-dd to dd-MMM-yyyy
    function processTakeoffDate(takeoffDate) {
      const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
      }

      const dateElems = takeoffDate.split("-")
      return `${dateElems[2]}-${months[dateElems[1]]}-${dateElems[0]}`
    }


    // Function to convert takeoff time from 24hr clock to 12hr clock
    function processTakeoffTime(takeoffTime) {
      const timeElems = takeoffTime.split(":")
      var hr = parseInt(timeElems[0], 10)
      const am_pm = hr > 12 ? "pm" : "am"
      if(hr === 0) {
        hr = 12
      }
      else if(hr > 12) {
        hr -= 12
      }

      return `${hr}:${timeElems[1]}${am_pm}`
    }

module.exports = router;
