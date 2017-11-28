'use strict';

var engine = require('../engine');

class Tour {
	
	constructor(args) {
		this.id = Tour.incrementId().toString();
		this.clubs = args.clubs;
		this.coeff = args.coeff;
		this.setLevel();		
	}
	
	play() {
		return engine.tourGen.play(this.matches);
	}
	
	draw() {
		this.matches = engine.tourGen.draw(this.clubs, this.coeff);
	}
	
	setLevel() {
		let i = 1;
		while(Math.pow(2,i) < this.clubs.length) {
			i++;
		}
		this.level = (Math.pow(2,i) == this.clubs.length) ? i : -1;
		this.name = this.toString();
	}
	
	
	toString() {
		return "Tour niveau : " + this.level.toString();
	}
	
	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}
};

module.exports = Tour;