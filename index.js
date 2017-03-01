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
    res.json(doodle.repondreCreneauEvenementOui(req.params.id,req.params.date,req.params.heure));
})

app.get('/non/:id/date/:date/heure/:heure', function (req, res){
    res.json(doodle.repondreCreneauEvenementNon(req.params.id,req.params.date,req.params.heure));
})

app.get('/evt', function(req, res){
    res.json(doodle.afficherEvt());
})

app.listen(8080,function(){
console.log('i hear you');
});
