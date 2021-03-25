var express = require('express');
var cities = require('../cities');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cities });
});

module.exports = router;
