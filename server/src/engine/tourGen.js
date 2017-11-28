const NE = require('node-exceptions');
const de = require('./de');
const Match = require('../models/match');

var draw = function(clubs, coeff) {
	if(clubs.constructor !== Array) {
		throw new NE.InvalidArgumentException("L'argument clubs n'est pas un Array : " + clubs);
	}
	if(clubs.length%2 !== 0) {
		throw new NE.InvalidArgumentException("Nombre impair de clubs : " + clubs.length);
	}

	let length = clubs.length;
	let matches = [];
	let clone = JSON.parse(JSON.stringify(clubs));
	for(var i=0; i < length/2 ; ++i) {
		matches.push(new Match({
			home: clone.splice(1-de.roll(clone.length),1)[0],
			away: clone.splice(1-de.roll(clone.length),1)[0],
			coeff: coeff
		}));
	}
	return matches;
}


var play = function(matches) { 
	let games = [];
	matches.forEach(m => games.push(m.play()));
	return Promise.all(games);
}

exports.draw = draw;
exports.play = play;