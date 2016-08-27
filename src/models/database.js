'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sports-poll');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Connection error to the Sports-Poll Database:', err);
});

db.once('open', function() {
  console.log('Successfully connected to the Sports-Poll Database');
});
