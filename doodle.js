var listeEvt = [];
var compteurId = 0;

// Constructeur pour les Evenements
function Evenement(titre,description) {
  // le titre de l'evt
	this.id = compteurId++;
  this.titre = titre;
	this.description = description;
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
	// date du creneau
	this.date = date;
	//heure du creneau
	this.heure = heure;
}

// créer un nouveau evenement
var creerEvenement = function(titre, description) {
	var eTemp = new Evenement(titre, description);	
	listeEvt[eTemp.id] = eTemp;
	return listeEvt;
}

var ajouterCreneauEvenement = function(id,date,heure) {
	var creneau1 = new Creneau(date,heure);
	listeEvt[id].ajouterCreneau(creneau1);
	return listeEvt[id].listeCreneaux;
}

var retirerCreneauEvenement = function(id,date,heure) {
	listeEvt[id].retirerCreneau(date,heure);
	return listeEvt[id].listeCreneaux;
}

var supprimerEvenement = function(id) {
	for (i=0; i<listeEvt.length;i++) {
		if (listeEvt[i].id == id) {
			listeEvt.splice(i,1);
		}
	}
	return listeEvt;
}

// les 2 fonctions exportées
exports.creerEvenement = creerEvenement;
exports.ajouterCreneauEvenement = ajouterCreneauEvenement;
exports.retirerCreneauEvenement = retirerCreneauEvenement;
exports.supprimerEvenement = supprimerEvenement;