'use strict';
var angular = require('angular');

var services = angular.module('sportsPollApp.services', []);

services.factory('eventsFactory', function($http) {

  return {
    getEvent: function() {
      return $http.get('/events');
    },
    postVote: function(id, vote) {
      return $http.post('/events/' + id + '/vote-' + vote);
    }
  };

});
