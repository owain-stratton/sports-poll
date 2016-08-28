(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var angular = require('angular');

var app = angular.module('sportsPollApp', ['sportsPollApp.controllers', 'sportsPollApp.services']);

require('./controllers/mainController.js');
require('./services/userService.js');

},{"./controllers/mainController.js":2,"./services/userService.js":3,"angular":"angular"}],2:[function(require,module,exports){
'use strict';
var angular = require('angular');

var controllers = angular.module('sportsPollApp.controllers', []);

controllers.controller('eventCtrl', function($scope, eventsFactory) {

  function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  function getRecentVotes() {
    var votes = localStorage.getItem('recentVotes');
    if (votes) {
      return JSON.parse(votes);
    } else {
      return [];
    }
  }

  function saveVote(str) {
    var votes = getRecentVotes();
    if (!str || votes.indexOf(str) > -1) {
      return false;
    }
    votes.push(str);
    localStorage.setItem('recentVotes', JSON.stringify(votes));
    return true;
  }

  var addVoteToLocalStorage = function(response) {
    if (supportsLocalStorage) {
      saveVote('Event objectID:' + response.data.objectId + ' with the vote outcome: ' + response.data.outcomeVote);
    }
    setTimeout(function() {
      eventsFactory.getEvent().then(successResponse, errorResponse);
    }, 1000);
  };

  var successResponse = function(response) {
    $scope.event = response.data[0];

    $scope.sport = $scope.event.sport.toLowerCase();
    $scope.country = $scope.event.country.toLowerCase();
    $scope.gameStatus = $scope.event.state.toLowerCase();
    $scope.flag = $scope.event.country.substring(0, 3).toLowerCase();

    $scope.drawVote = false;
    $scope.homeVote = false;
    $scope.awayVote = false;

    $scope.postVote = function(vote) {

      if (vote === 'home') {
        $scope.homeVote = true;
      } else if(vote === 'away') {
        $scope.awayVote = true;
      } else {
        $scope.drawVote = true;
      }

      eventsFactory.postVote($scope.event._id, vote).then(addVoteToLocalStorage, errorResponse);

    };
  };

  var errorResponse = function(err) {
    console.error(err.message);
  };

  eventsFactory.getEvent().then(successResponse, errorResponse);

});

},{"angular":"angular"}],3:[function(require,module,exports){
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

},{"angular":"angular"}]},{},[1]);
