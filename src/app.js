'use strict';
var express = require('express');
var parser = require('body-parser').json;
var morgan = require('morgan');
var routes = require('./routes/router.js');

var app = express();

app.use(morgan('dev'));
app.use(parser());

app.use('/events', routes);








var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('The server is running on port 3000. Code on!!!');
});
