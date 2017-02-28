'use strict';

/**
 * @ngdoc function
 * @name banqueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banqueApp
 */
angular.module('doodleApp')
  .controller('MainCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.test="ceci est un test";
    $scope.listeEvt ;
    $scope.id;
    $scope.list=[];
    
    $scope.evt={
	titre: "",
	description:""
    };
    
  

$scope.creerEvt= function(){
    //création d event
    $http({method: 'POST', url: '/evt/'+$scope.titre+'/description/'+$scope.description}).then(function successCallback(response) {
     // code si réussite
      $scope.listeEvt=response.data;
      console.log(response.data);
     });
     
     
 $scope.supprimerEvt=function(){
     $http({method: 'GET', url: '/evt/'+$scope.id}).then(function successCallback(response) {
     // code si réussite
      $scope.listeEvt=response.data;
      console.log(response.data);
     });
     
     
 }   
    

};
    
    
    
    
  });
