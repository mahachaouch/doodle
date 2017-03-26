/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('doodleApp')
  .controller('CreerProfilCtrl', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.profil={
        login:"",
        nom:"",
       prenom:""
    };
    
    $scope.login;
    $scope.nom;
    $scope.prenom;
    $scope.creerProfil=function(){
        console.log('ici');
           $http({method: 'POST', url: '/profil/'+$scope.login+'/nom/'+$scope.nom+'/prenom/'+$scope.prenom}).then(function successCallback(response) {
     // code si réussite
      $scope.evtResponse=response.data;
      console.log(response.data);
     });
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
  });
