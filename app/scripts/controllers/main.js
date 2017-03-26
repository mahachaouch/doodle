'use strict';

/**
 * @ngdoc function
 * @name banqueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the banqueApp
 */
angular.module('doodleApp')
  .controller('MainCtrl', function ($scope,$http,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 
    $scope.listeEvt ;
    $scope.id;
    $scope.login;
    $scope.idEvtCreanAdd;
    $scope.date;
    $scope.evtResponse;
    $scope.CreauxAaffich;
    $scope.heure;
    $scope.list=[];
    $scope.afficherCreanux=false;
    //l id de l evt choisi pour voir ses crénaux
    $scope.idEvtCreneauAffich=-1;
    
    $rootScope.isConnected=false;
    $scope.identification=false;
    $scope.seConnecter=function(){
         $scope.identification=true;
    }
    
    
    $scope.afficherCrean=function(creaux){
        console.log(creaux);
        $scope.afficherCreanux=true;
        $scope.CreauxAaffich= creaux;
    };
    
    $scope.connexion=function(){
           $http({method: 'GET', url: '/auth/'+$scope.login}).then(function successCallback(response) {
     // code si réussite
      $scope.evtResponse=response.data;
      console.log(response.data);
      $scope.identification=false;
     });
    };
    
    
    $scope.fermer =function(){
        $scope.afficherCreanux=false;
    };
    
    $scope.getEventById=function(id){
       
        $http({method: 'GET', url: '/id/'+$scope.id}).then(function successCallback(response) {
     // code si réussite
      $scope.evtResponse=response.data;
      console.log(response.data);
     });
    }
    
    $scope.getCreauxByIdEvt=function(id){
        var evt =$scope.getEventById(id);
        console.log(evt.listeCreneaux);
        return evt.listeCreneaux;    
    };
    
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
     
};  
 $scope.supprimerEvt=function(){
     $http({method: 'GET', url: '/evt/'+$scope.id}).then(function successCallback(response) {
     // code si réussite
      $scope.listeEvt=response.data;
      console.log(response.data);
     });
     
     
 };
    


    
   $scope.creerCrenau=function(){
       $http({method: 'POST', url: '/id/'+$scope.idEvtCreanAdd+'/date/'+$scope.date+'/heure/'+$scope.heure}).then(function successCallback(response) {
     // code si réussite
      $scope.crenau=response.data;
      console.log($scope.listeEvt);
     });
   };
    
    
  });
