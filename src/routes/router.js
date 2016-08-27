'use strict';
var express = require('express');
var router = express.Router();

// GET /events/:id
// Retrieves a specific event from DB
router.get('/:id', function(req, res, next) {
  res.json({
    message: 'The GET request',
    outcome: req.params.id
  });
});


// POST events/:id/vote-home
// POST events/:id/vote-away
// POST events/:id/vote-draw
// Vote on the outcome of a specific event
router.post('/:id/vote-:outcome', function(req, res, next) {
  if(req.params.outcome.search(/^(home|draw|away)$/) === -1) {
    var err = new Error('The vote you cast was not appropriate for the outcome');
    err.status = 404;
    next(err);
  } else {
    res.json({
      message: 'The POST request',
      outcome: req.params.outcome
    });
  }

});






module.exports = router;
