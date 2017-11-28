// src/resolvers.js
const demo = require('./demo');

const clubs = demo.generateClubs(500);
const coupe = demo.generateCoupe(clubs);
for(let i=0; i<coupe.toursToPlay.length;++i) {
	coupe.drawNextTour();
	coupe.playNextTour();
}


exports.resolvers = {
  Query: {
    clubs: () => {
      return clubs;
    },
	club: (root, { id }) => {
		return clubs.find(c => c.id === id);
	},
	matches: (root, {levelTour}) => { 
		return coupe.tours.find(t => t.level == levelTour).matches;
	},
	match: (root, { levelTour, idClub }) => {
		let tour = coupe.tours.find(t => t.level == levelTour);
		if(!tour) return null;
		let dom = tour.matches.find(m => m.home.id === idClub);
		return (dom !== undefined) ? dom : tour.matches.find(m => m.away.id === idClub);
	},
	bigUpset: (root, {levelTour}) => {
		let tour = coupe.tours.find(t => t.level == levelTour);
		let biggestGap = 0;
		let upset;
		tour.matches.forEach(m => {
			let loser = (m.result.winner.id === m.home.id) ? m.away : m.home;
			let gap = m.result.winner.totalCoeff - loser.totalCoeff;
			if(gap < biggestGap) {
				biggestGap = gap;
				upset = m;
			}
		});
		return upset;
	},
	coupe: () => {
		return coupe;
	}
  },
};