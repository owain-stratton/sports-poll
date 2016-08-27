'use strict';
var express = require('express');
var router = express.Router();

// GET /events/:id
// Retrieves a specific event from DB
router.get('/:id', function(req, res, next) {
  console.log('This was a GET request for event ID:', req.params.id);
});


// POST events/:id/vote-home
// POST events/:id/vote-away
// POST events/:id/vote-draw
// Vote on the outcome of a specific event
router.post('/:id/vote-:outcome', function(req, res, next) {
  console.log('This was a POST request with the outcome to be', req.params.outcome);
});






module.exports = router;
