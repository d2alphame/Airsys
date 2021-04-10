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
   
  let sql = 'select flight_number flightNumber, takeoff_date takeoffDate, takeoff_time takeoffTime, takeoff_city takeoffCity, takeoff_airport takeoffAirport, takeoff_terminal takeoffTerminal, destination_city destinationCity, flight_duration flightDuration from flights'
  db.all(sql, (err, rows) => {
    if(err) {
      console.log(err)
      res.json({error: "Your request could not be completed"})
    }
    else {
      if(rows.length) {
        // console.log(rows)
        res.render('admin', {rows})
      }
    }
  })
});

module.exports = router;
