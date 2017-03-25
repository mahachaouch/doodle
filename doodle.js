var listeEvt = [];
var listeProfil = [];
var compteurId = 0;
var auth = null;

// Constructeur pour les Evenements
function Evenement(titre,description) {
  // le titre de l'evt
	this.id = compteurId++;
  this.titre = titre;
	this.description = description;
  this.propriétaire = auth;
	this.listeCreneaux = [];
  // pour ajouter creneau à l'evenement
  this.ajouterCreneau = function(Creneau) {
  	this.listeCreneaux.push(Creneau);
  }
  // pour retirer creneau de l'evenement
  this.retirerCreneau = function(date,heure) {
		for (i=0; i<this.listeCreneaux.length;i++) {
			if ((this.listeCreneaux[i].date == date) && (this.listeCreneaux[i].heure == heure)) {
				this.listeCreneaux.splice(i,1);
			}
		}
  }
}

// Constructeur pour les Creneaux
function Creneau(date,heure) {
	this.listeReponses = [];

	// date du creneau
	this.date = date;
	//heure du creneau
	this.heure = heure;


	this.repondreCreneauOui = function(){
		var rTemp = rechercheReponseCreneau(auth,this.listeReponses);
		if(rTemp == null){
			rTemp = new Reponse(true);
			this.listeReponses.push(rTemp);
		}else{
			rTemp.dispo = true;
		}

	}

	this.repondreCreneauNon = function(){
		var rTemp = rechercheReponseCreneau(auth,this.listeReponses);
		if(rTemp == null){
			rTemp = new Reponse(false);
			this.listeReponses.push(rTemp);
		}else{
			rTemp.dispo = false;
		}
	}
}

//Constructeur pour les reponses
function Reponse(dispo){
	//login de l'utilisateur qui répond
	this.login = auth;
	//disponibilité au créaneau
	this.dispo = dispo;
}

//Version 2//

function Profil(login,nom,prenom){
		this.login = login;
		this.nom = nom;
		this.prenom = prenom;
		this.connecte = false;
}

var creerProfil = function(login, nom, prenom) {
	//vérifier que le login n'existe pas
	var pTemp = new Profil(login, nom, prenom);
	listeProfil.push(pTemp);
	return listeProfil;
}

var connexion = function (login) {
	for (i=0; i<listeProfil.length;i++){
		if (listeProfil[i].login == login){
			listeProfil[i].connecte = true;
			auth = login;
			pTemp = listeProfil[i];
		}else {
			listeProfil[i].connecte = false;
		}
	}
    return pTemp;
}

var isConnected = function(login){
	var pTemp = rechercheProfil(login);
	return pTemp.connecte;
}

var logOut = function(){
	var pTemp = rechercheProfil(auth);
	pTemp.connecte = false;
	auth = null;
}
//Version 2//



// créer un nouveau evenement
var creerEvenement = function(titre, description) {
	var eTemp = new Evenement(titre, description);
	listeEvt.push(eTemp);
	return listeEvt;
}

var ajouterCreneauEvenement = function(id,date,heure) {
	var creneau1 = new Creneau(date,heure);
	var evt = rechercheEvt(id);
	evt.ajouterCreneau(creneau1);
	return evt.listeCreneaux;
}

var retirerCreneauEvenement = function(id,date,heure) {
	var evt = rechercheEvt(id);
	evt.retirerCreneau(date,heure);
	return evt.listeCreneaux;
}

var supprimerEvenement = function(id) {
	for (i=0; i<listeEvt.length;i++) {
		if (listeEvt[i].id == id) {
			listeEvt.splice(i,1);
		}
	}
	return listeEvt;
}

var repondreCreneauEvenementOui = function (id,date,heure) {
	var evt = rechercheEvt(id);
	for (i=0; i<evt.listeCreneaux.length;i++) {
			if ((evt.listeCreneaux[i].date == date) && (evt.listeCreneaux[i].heure == heure)) {
				evt.listeCreneaux[i].repondreCreneauOui();
			}
		}
	return evt.listeCreneaux.listeReponses;
}

var repondreCreneauEvenementNon = function (id,date,heure) {
	var evt = rechercheEvt(id);
	for (i=0; i<evt.listeCreneaux.length;i++) {
			if ((evt.listeCreneaux[i].date == date) && (evt.listeCreneaux[i].heure == heure)) {
				evt.listeCreneaux[i].repondreCreneauNon();
			}
		}
	return evt.listeCreneaux.listeReponses;
}

//affiche la totalité des évènements
var afficherEvt = function(){
	return listeEvt;
}




//fonction pour rechercher un événement dans la liste
var rechercheEvt = function(id){
	for (i=0; i<listeEvt.length;i++){
		if (listeEvt[i].id == id){
			return listeEvt[i];
		}
	}
}

var rechercheProfil = function(login){
	for (i=0; i<listeProfil.length;i++){
		if (listeProfil[i].login == login){
			return listeProfil[i];
		}
	}
}

var rechercheReponseCreneau = function(login,listeR){
	for(i=0; i<listeR.length;i++){
		if(listeR[i].login == login){
			return listeR[i];
		}
	}
}

// les 2 fonctions exportées
exports.creerEvenement = creerEvenement;
exports.ajouterCreneauEvenement = ajouterCreneauEvenement;
exports.retirerCreneauEvenement = retirerCreneauEvenement;
exports.supprimerEvenement = supprimerEvenement;
exports.repondreCreneauEvenementNon = repondreCreneauEvenementNon;
exports.repondreCreneauEvenementOui = repondreCreneauEvenementOui;
exports.afficherEvt = afficherEvt;
exports.creerProfil = creerProfil;
exports.connexion = connexion;
exports.isConnected = isConnected;
exports.rechercheProfil = rechercheProfil;
exports.logOut = logOut;
