'use strict'

const NE = require('node-exceptions');
var engine = require('../engine');
var Tour = require('./tour');

class Coupe {
	constructor(args) {
		this.id = Coupe.incrementId();
		this.clubsQualifies = args.clubs;
		this.clubsElimines = [];
		this.name = "Coupe " + this.id.toString();
		this.tours = [];
		this.init();
	}

	init() {
		this.toursToPlay= [];

		this.matchCount = 0;

		let i = 0;
		while(Math.pow(2,i+1) < this.clubsQualifies.length) {
			this.toursToPlay.unshift(i);
			this.matchCount += Math.pow(2,i);
			i++;
		}
		this.tourCount = i;

		this.needsTP = (Math.pow(2,i) !== this.clubsQualifies.length);
		if(this.needsTP) {
			// Détermine le nombre de matches de TP
			this.matchTPCount = this.clubsQualifies.length - Math.pow(2,i);
			this.toursToPlay.unshift(-1);

			this.clubsQualifies.sort((a,b) => a.totalCoeff < b.totalCoeff ? -1 : 0);
			this.clubsTP = this.clubsQualifies.splice(0,this.matchTPCount*2);
		}

		let coeffTotal = 1.5*this.clubsQualifies.length;
		this.coeffPerMatch = coeffTotal/this.matchCount; 

		this.pending = false;
	}

	drawNextTour() {
		if(this.toursToPlay.length > 0) {
			let nextTourLevel = this.toursToPlay[0];
			let newTour;
			if(nextTourLevel === -1) {
				newTour = new Tour({ clubs: this.clubsTP, coeff: 0});
			} else {
				newTour = new Tour({ clubs: this.clubsQualifies, coeff: this.coeffPerMatch });
			}
			newTour.draw();
			this.tours.push(newTour);
			this.pending = true;
		}
	}

	playNextTour() {
		var me = this;
		if(me.toursToPlay.length > 0 && me.pending === true) {
			me.tours.find(t => t.level === me.toursToPlay[0]).play().then(results => {
				console.log("Tour suivant joué");
				results.forEach(r => {
					var loser = r.winner === r.home ? r.away : r.home;
					me.clubsQualifies.remove(loser);
					me.clubsElimines.push(loser);
				});
				me.toursToPlay.splice(0,1);
				me.pending = false;
			}).catch(reason => console.log("Erreur lors de playNextTour : "+reason));
		} else {
			console.log("Erreur lors de playNextTour, échec des vérifications : " + me.tours + me.pending);
		}
	}

	finalizeSession() {
		this.clubs.forEach(c => c.finalizeSession());
	}


	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}
}

module.exports = Coupe;