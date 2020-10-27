"use strict"; // JavaScript code is executed in "strict mode"

const http = require('http');
const https = require('https');
const path = require('path');

var express = require('express');
var app = express();
var favicon = require('serve-favicon');

var bodyParser = require('body-parser');

var JL = require('jsnlog').JL;
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;

var logger = require('morgan');

// set the routers-paths
var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// logging HTTP requests
app.use(logger('dev'));

// load/provide all files given in the folder public
app.use(express.static(path.join(__dirname, 'public')));

// use built-in middleware which parses incoming requests with JSON payloads so that explicit parse expressions for every JSON are not necessary
app.use(express.json());

// use built-in middleware which parses urlencoded bodies, https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));


// set the routes for npm-installed client-libraries
app.use("/jquery", express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use("/bootstrap", express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use("/popper", express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist')));

// ********************************** JSNLog ***********************************

// jsnlog.js on the client-side sends log messages to /jsnlog.logger, using POST
app.post("/jsnlog.logger", function (req, res) {
  jsnlog_nodejs(JL, req.body);

  // jsnlog on the client-side does not use the response from server, therefore send an empty response
  res.send('');
});


// *****************************************************************************

// router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({err_msg: "Not Found"});
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // respond with html page
  res.send({
    err_msg: err.message
  });
});


module.exports = app;
