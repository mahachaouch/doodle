'use strict';

/**
 * @ngdoc overview
 * @name banqueApp
 * @description
 * # banqueApp
 *
 * Main module of the application.
 */
var ang = angular
  .module('doodleApp', [
    'ngResource',
    'ngSanitize', 
    'ui.router'
  ]);

ang.config(function($stateProvider) {
 var mainState = {
    name: 'main',
    url: '/',
        controller: 'MainCtrl',
        controllerAs: 'main',
    templateUrl: 'views/main.html'
  }

  var saisirpositionState = {
    name: 'saisirposition',
    url: '/position/compte/',
    templateUrl: 'views/saisirposition.html'
    
  }
  var positionState = {
    name: 'position',
    url: '/position/compte/{idcpt}',
    templateUrl: 'views/position.html'
    
  }

  $stateProvider.state(mainState);
  $stateProvider.state(saisirpositionState);
  $stateProvider.state(positionState);
});

