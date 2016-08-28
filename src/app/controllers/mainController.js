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
