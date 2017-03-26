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
    url: '/evt',
        controller: 'MainCtrl',
        controllerAs: 'main',
    templateUrl: 'views/main.html'
  }

  var saisirpositionState = {
    name: 'saisirposition',
    url: '/position/compte/',
    templateUrl: 'views/saisirposition.html'
    
  }
  var profilState = {
    name: 'profil',
    url: '/profil/{idProfil}',
    templateUrl: 'views/profil.html'
    
  }
  var creerProfilState= {
      name:'creerProfil',
      url:'/creerProfil',
        controller:'CreerProfilCtrl',
        controllerAs:'creerProfil',
      templateUrl: 'views/creerProfil.html',
      
  }

  $stateProvider.state(mainState);
  $stateProvider.state(saisirpositionState);
  $stateProvider.state(profilState);
  $stateProvider.state(creerProfilState);
});

