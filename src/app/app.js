'use strict';
var angular = require('angular');

var app = angular.module('sportsPollApp', ['sportsPollApp.controllers', 'sportsPollApp.services']);

require('./controllers/mainController.js');
require('./services/userService.js');
