'use strict';

class Club {
	
	constructor(args) {
		this.id = Club.incrementId().toString();
		this.name = args.name;
		this.setCoeff(args.coeff);
	}
	
	toString() {
		return this.name;
	}
	
	setCoeff(array) {
		this.coeff = array;
		this.totalCoeff = this.aggregateCoeff();
		this.pendingCoeff = 0;
	}
	
	aggregateCoeff() {
		let aggregate = 0; 
		let numIt = (this.coeff.length > 5) ? 5 : this.coeff.length;
		for(let i = 0; i < numIt ; ++i) {
			aggregate += this.coeff[i];
		}
		return aggregate;
	}
	
	addCoeff(coeff) {
		this.coeff.unshift(coeff);
		this.totalCoeff = this.aggregateCoeff();
	}

	addToPendingCoeff(value) {
		this.pendingCoeff += value;
	}

	finalizeSession() {
		this.addCoeff(this.pendingCoeff);
		this.pendingCoeff = 0;
	}
	
	static incrementId() {
		if (!this.latestId) this.latestId = 1;
		else this.latestId++;
		return this.latestId;
	}
};

module.exports = Club;