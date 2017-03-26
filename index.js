var express = require('express');
var doodle = require('./doodle');
var bodyParser = require('body-parser');
var app= express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.post('/evt/:titre/description/:description',function(req,res){
    res.json(doodle.creerEvenement(req.params.titre,req.params.description));
});

app.post('/id/:id/date/:date/heure/:heure',function(req,res){
    res.json(doodle.ajouterCreneauEvenement(req.params.id,req.params.date,req.params.heure));
});

app.get('/evt/:id/date/:date/heure/:heure', function (req, res) {
    res.json(doodle.retirerCreneauEvenement(req.params.id,req.params.date,req.params.heure));
});

app.get('/evt/:id', function (req, res) {
    res.json(doodle.supprimerEvenement(req.params.id));
});

app.get('/oui/:id/date/:date/heure/:heure', function (req, res){
  if (doodle.auth == null) {
      console.log('il faut vous connecter');
  }
  else {
    res.json(doodle.repondreCreneauEvenementOui(req.params.id,req.params.date,req.params.heure));
  }
});

app.get('/non/:id/date/:date/heure/:heure', function (req, res){
  if (doodle.auth == null) {
      console.log('il faut vous connecter');
  }
  else {
    res.json(doodle.repondreCreneauEvenementNon(req.params.id,req.params.date,req.params.heure));
  }
});

app.get('/evt', function(req, res){
    if (doodle.auth == null) {
        console.log('il faut vous connecter');
    }
    else {
        res.json(doodle.afficherEvt());
    }
});

app.post('/profil/:login/nom/:nom/prenom/:prenom', function(req, res){
    res.json(doodle.creerProfil(req.params.login, req.params.nom, req.params.prenom));
});

app.get('/connected/:login',function(req,res){
    res.json(doodle.isConnected(req.params.login));
});

app.get('/auth/:login',function(req, res) {
    if (doodle.connexion(req.params.login) != null) {
        doodle.auth = req.params.login;
        console.log('connecté en tant que '+ doodle.auth+' isConnected '+doodle.rechercheProfil(req.params.login).connecte);
        res.json(doodle.rechercheProfil(req.params.login));
    }
    else {
        console.log('erreur connexion, login inconnu');
    }
});

app.get('/logOut',function(req, res) {
    doodle.auth = null;
    doodle.logOut();
    console.log('vous avez été deconnecté');
});

app.get('/cloturerEvt/:id',function(req,res){
    if(doodle.auth != doodle.rechercheEvt(req.params.id).propriétaire){
      console.log('vous devez être le propriétaire');
    }else{
      res.json(doodle.cloturerEvenement(req.params.id));
    }
});

app.listen(8080,function(){
console.log('i hear you');
});
