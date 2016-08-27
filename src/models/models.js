'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventData = require('../data/test-assignment.json');

var EventSchema = new Schema({
  "awayName":     String,
  "createdAt":    String,
  "group":        String,
  "homeName":     String,
  "id":           Number,
  "name":         String,
  "objectId":     String,
  "sport":        String,
  "country":      String,
  "state":        String,
  "outcomeVote":  {type: String, default: 'No vote'}
});

EventSchema.method('vote', function(vote, callback) {
  this.outcomeVote = vote;
  this.save(callback);
});

var Event = mongoose.model('Event', EventSchema);

Event.remove({}, function(err) {
  if(err) console.log('Remove Failed', err);

  Event.create(eventData, function(err, events) {
    if(err) console.log('Save Failed', err);

    events.forEach(function(event) {
      console.log(event);
    });
  });
});

module.exports.Event = Event;
