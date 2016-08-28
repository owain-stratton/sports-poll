'use strict';
var express = require('express');
var parser = require('body-parser').json;
var morgan = require('morgan');
var routes = require('./routes/router.js');

var app = express();

app.use(morgan('dev'));
app.use(parser());

// Connect to the Database
require('./models/database');

app.use('/', express.static('public'));

app.use('/events', routes);


app.use(function(req, res, next) {
  var err = new Error('The page you were looking for could not be found please try another');
  err.status = 404;
  next(err);
});

// Error event handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('The server is running on port 3000. Code on!!!');
});
