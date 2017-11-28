'use strict';

var engine = require('../engine');

class Match {
	
	constructor(args) {
		this.id = Match.incrementId().toString();
		this.home = args.home;
		this.away = args.away;
		this.result = null;
		this.name = this.toString();
		this.coeff = args.coeff;
	}
	
	play() {
		var me = this;
		return new Promise(function(resolve,reject) {
			me.result = engine.matchGen.matchResolver(me.home,me.away); console.log(me.result.winner.pendingCoeff);
			me.result.winner.pendingCoeff += me.coeff;
			if (me.result) {
				resolve(me.result);
			} else {
				reject("Fonction matchResolver n'a pas renvoyé de résultat pour "+me);
			}
		});
	}
	
	set result(value) {
		this._result = value;
		this.name = this.toString();
	}

	get result() {
		return this._result;
	}
	
	toString() {
		return this.home.name + this.getResultText() + this.away.name;
	}
	
	getResultText() {
		let homeString = '';
		let awayString = '';
		let extraTimeString = '';
		let shootoutString = '';
		if(this.result) {
			let homeScore = 0;
			let awayScore = 0;
			homeScore += this.result.regularTime.homeScore;
			awayScore += this.result.regularTime.awayScore;
			if(this.result.extraTime) {					
				homeScore += this.result.extraTime.homeScore;
				awayScore += this.result.extraTime.awayScore;
				if(this.result.shootout) {
					shootoutString = ' (' + this.result.shootout.homeScore.toString() + ' - ' + this.result.shootout.awayScore.toString() + ' tab) ';
				} else {					
					extraTimeString = ' (a.p.) ';
				}
			}
			homeString = " " + homeScore.toString();
			awayString = awayScore.toString() + " ";
		}
		return homeString + " - " + awayString + extraTimeString  + shootoutString;
	}
		
	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}
};

module.exports = Match;