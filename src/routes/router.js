'use strict';
var express = require('express');
var router = express.Router();
var Event = require('../models/models').Event;

router.param('id', function(req, res, next, id) {
  Event.findById(id, function(err, doc) {
    if(err) return next(err);
    if(!doc) {
      err = new Error('There is no event with this ID');
      err.status = 404;
      return next(err);
    }
    req.event = doc;
    return next();
  });
});

// GET /events/:id
// Retrieves a specific event from DB
router.get('/:id', function(req, res, next) {
  res.json(req.event);
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
    req.outcomeVote = req.params.outcome;
    next();
  }
},
function(req, res, next) {
  req.event.vote(req.outcomeVote, function(err, event) {
    if(err) return next(err);
    res.json(event);
  });
});






module.exports = router;
