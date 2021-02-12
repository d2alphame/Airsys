// Contains routes for handling bookings.
  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open a database connection
let db = new sqlite3.Database('../flights.db');


// Make a request to this route make a booking 
router.post('/', function(req, res, next) {

})

// Make a request to this route to cancel a booking
router.post('/remove/:id', function(req, res, next) {
	
})
module.exports = router;