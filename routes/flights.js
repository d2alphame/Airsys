  
var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open a database connection
let db = new sqlite3.Database('../flights.db');

// Make a call to this route to create a flight schedule
router.post('/', function(req, res, next) {

	
})
module.exports = router;