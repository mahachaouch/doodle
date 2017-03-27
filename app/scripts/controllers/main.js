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
 
    $rootScope.listeEvt ;
    $scope.msg=false;
    $scope.id;
    $rootScope.myEvts;
    $scope.login;
    $scope.idEvtCreanAdd;
    $scope.date;
    $scope.evtResponse;
    $scope.CreauxAaffich;
    $scope.heure;
    $scope.list=[];
    $scope.afficherCreanux=false;
    //l id de l evt choisi pour voir ses crénaux
    $scope.idEvtCreneauAffich;
    $scope.open=false;
    
    $scope.creer=function(){
        $scope.open=true;
    };
    
    $rootScope.isConnected=false;
    $scope.identification=false;
    $scope.seConnecter=function(){
         $scope.identification=true;
    };
      
    $rootScope.login;
    $rootScope.nom;
    $rootScope.prenom;
    
        $scope.creerProfil=function(login,nom,prenom){
            console.log(login);
           $http({method: 'POST', url: '/profil/'+login+'/nom/'+nom+'/prenom/'+prenom}).then(function successCallback(response) {
     // code si réussite
    
      $scope.open=false;
      console.log(response.data);
     });
    };

    $scope.getEvts=function(){
  
           $http({method: 'GET', url: '/evt'}).then(function successCallback(response) {
     // code si réussite
      $rootScope.listeEvt=response.data;
      
      console.log(response.data);
     });
    };
    
    $scope.afficherCrean=function(creaux,idEvt){
        console.log(creaux);
        $scope.afficherCreanux=true;
        $scope.CreauxAaffich= creaux;
        $scope.idEvtCreneauAffich=idEvt;
       
    };
    
    $scope.participer=function(date,heure){
        
        
                   $http({method: 'GET', url: '/oui/'+$scope.idEvtCreneauAffich+'/date/'+date+'/heure/'+heure}).then(function successCallback(response) {
     // code si réussite   
      console.log(response.data);
     });
        
    }; 
    
    
    $scope.connexion=function(login){
       
           $http({method: 'GET', url: '/auth/'+login}).then(function successCallback(response) {
     // code si réussite
     $scope.utilisateur=response.data;
      console.log(response.data);
      
      $scope.identification=false;
      $rootScope.isConnected=true;
      
      //set utilisateur
        $rootScope.login=$scope.utilisateur.login;
       $rootScope.nom= $scope.utilisateur.nom; 
       $rootScope.prenom=$scope.utilisateur.prenom;
      // $scope.getMyEvt($scope.utilisateur.login);
      $scope.getEvts();
 
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
    
  $rootScope.getMyEvt=function(){
      
      $http({method: 'GET', url:'/myevt/login/'+$rootScope.login }).then(function successCallback(response) {
     // code si réussite
      $rootScope.myEvts=response.data;
     
      //console.log(response.data);
     });
     
  };

$scope.creerEvt= function(titre,desc){
    //création d event
    $http({method: 'POST', url: '/evt/'+titre+'/description/'+desc}).then(function successCallback(response) {
     // code si réussite
      $rootScope.listeEvt=response.data;
      console.log(response.data);
      
      //mettre à jour la liste des evts crées par l utilisateur
      $rootScope.getMyEvt();
     });
     
};  
 $scope.supprimerEvt=function(id){

     $http({method: 'GET', url: '/evt/'+id}).then(function successCallback(response) {
     // code si réussite
      $rootScope.listeEvt=response.data;
     
      console.log(response.data);
     });
     
     
 };
   
//      $scope.isConnected=function(){
//                $http({method: 'GET', url: '/connected/'+$scope.login}).then(function successCallback(response) {
//     
//      console.log(response.data);
//     });
//         
//      };


    
   $scope.creerCrenau=function(idEvtCreanAdd,date,heure){
       $http({method: 'POST', url: '/id/'+idEvtCreanAdd+'/date/'+date+'/heure/'+heure}).then(function successCallback(response) {
     // code si réussite
      $scope.crenau=response.data;
      console.log(response.data);
     });
   };
    
    
  });
