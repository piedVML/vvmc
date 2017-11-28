var engine = require('./engine');
var Club = require('./models/club');
var Tour = require('./models/tour');
var Coupe = require('./models/coupe');

var demo = function() {
	let club1 = {
		name: "club1",
		coeff: engine.coeff.randomCoeffGenerator()
	};
	let club2 = {
		name: "club2",
		coeff: engine.coeff.randomCoeffGenerator()
	};

	let match = engine.Match.matchResolver(club1,club2);

	console.log("*****************");
	console.log(club1.name + "("+club1.coeff+")  " + match.regularTime.homeScore + " - " + match.regularTime.awayScore + " " + club2.name + "("+club2.coeff+")");
	if(match.extraTime) {
		console.log((match.regularTime.homeScore + match.extraTime.homeScore) + " - " + (match.regularTime.awayScore + match.extraTime.awayScore) + " ap");
	}
	if(match.shootout) {
		console.log(match.shootout.homeScore + " - " + match.shootout.awayScore + " tab");
	}
	console.log("QUALIFiE : " + match.winner.name);
	console.log("*****************");
	
	return "Done!";
};


var generateClubs = function(numClubs) {
	let clubs = [];
	for (let i = 1; i <= numClubs; ++i) {
		clubs.push(new Club({
			name: "club" + i.toString(),
			coeff: engine.coeff.randomCoeffArrayGenerator()
		}));
	}
	return clubs;
}

var generateTour = function(clubs) {
	let tour = new Tour({
		clubs: clubs
	}); 
	tour.draw();
	return tour;
}

var generateCoupe = function(clubs) {
	let coupe = new Coupe({
		clubs: clubs
	});
	return coupe;
}

exports.demo = demo;
exports.generateClubs = generateClubs;
exports.generateTour = generateTour;
exports.generateCoupe = generateCoupe;
