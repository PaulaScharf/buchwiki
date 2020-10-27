"use strict";  // JavaScript code is executed in "strict mode"

var express = require('express');
var router = express.Router();


/* GET main page.*/
router.get('/', function(req, res, next) {
  res.render('index');
});


/* GET contacts page */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});


module.exports = router;
