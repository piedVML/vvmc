const coeff = require('./coeff');
const de = require('./de');
const NE = require('node-exceptions');

/**
 * Détermine le résultat du temps réglementaire
 * @param {num} ratio 
 */
var rTResult = function(ratio) {
    let roll = de.roll(100);

    // cas particuliers
    if (roll < 3) {
        return 2;
    } else if (roll === 50) {
        return "N";
    } else if (roll > 95) {
        return 1;
    }

    // cas nominaux
    let result = de.roll(100) * ratio;
    return (result < 25) ? 2 : (result > 55) ? 1 : "N";
}

/**
 * Détermine l'écart pour le résultat du temps réglementaire
 * @param {*} result 
 */
var rTGap = function(result) {
    if (result === 1 || result === 2) {
        let roll = de.roll(100);
        if (roll < 50) {
            return 1;
        } else if (roll < 90) {
            return 2;
        } else if (roll < 97) {
            return 3;
        } else if (roll < 100) {
            return 4;
        } else {
            return 4 + de.roll(6);
        }
    } else if (result === "N") {
        return 0;
    } else {
        throw new NE.InvalidArgumentException("Impossible de calculer l'écart temps réglementaire pour résultat : " + result);
    }
}

/**
 * Détermine le score du perdant à l'issue du temps réglementaire
 */
var rTLoserScore = function() {
    let roll = de.roll(1000);
    if (roll < 500) {
        return 2 - de.roll(2);
    } else if (roll < 900) {
        return 3 - de.roll(3);
    } else if (roll < 990) {
        return 4 - de.roll(4);
    } else {
        return 6 - de.roll(6);
    }
}

/**
 * Détermine le score des deux équipes
 * @param {int} gap 
 */
var rTScore = function(gap) {
    if(!Number.isInteger(gap) && gap > 0) {
        throw new NE.InvalidArgumentException("Impossible de déterminer le score du perdant temps réglementaire pour l'écart : " + gap);
    }

    var loserScore = rTLoserScore();
    var winnerScore = loserScore + gap;
    return {
        loserScore: loserScore,
        winnerScore: winnerScore
    };
}


/**
 * Renvoie le score et le vainqueur/perdant du temps réglementaire
 * @param {club} home 
 * @param {club} away 
 */
var rTGenerator = function (home, away) {
    let result = rTResult(coeff.matchRatio(home,away));
    let score = rTScore(rTGap(result));
    let homeScore = (result !== 2) ? score.winnerScore : score.loserScore;
    let awayScore = (result === 2) ? score.winnerScore : score.loserScore;
    
    return {
        homeScore: homeScore,
        awayScore: awayScore
    }
}


var eTResult = function() {
    let roll = de.roll(100);
    if (roll < 30) {
        return 2;
    } else if (roll > 70) {
        return 1;
    } else {
        return "N";
    }
}


var eTLoserScore = function() {
    let roll = de.roll(100);
    if (roll < 70) {
        return 0;
    } else if (roll < 90) {
        return 1;
    } else  {
        return 2;
    } 
}

var eTScore = function(gap) {
    if(!Number.isInteger(gap)) {
        throw new NE.InvalidArgumentException("Impossible de déterminer le score du perdant prolongations pour l'écart : " + gap);
    }

    var loserScore = eTLoserScore();
    var winnerScore = loserScore + gap;
    return {
        loserScore: loserScore,
        winnerScore: winnerScore
    };
}


var eTGap = function(result) {
    if (result === 1 || result === 2) {
        let roll = de.roll(100);
        if (roll < 70) {
            return 1;
        } else if (roll < 95) {
            return 2;
        } else {
            return 3;
        } 
    } else if (result === "N") {
        return 0;
    } else {
        throw new NE.InvalidArgumentException("Impossible de calculer le score du perdant pour résultat : " + result);
    }
}


var eTGenerator = function() {
    let result = eTResult();
    let score = eTScore(eTGap(result));
    let homeScore = (result !== 2) ? score.winnerScore : score.loserScore;
    let awayScore = (result === 2) ? score.winnerScore : score.loserScore;   

    return {
        homeScore: homeScore,
        awayScore: awayScore
    }
}


var sGenerator = function() {
    let round = 0;
    let sHome = 0;
    let sAway = 0;
    let done = false;

    while (done === false) {
        if(round < 5) {
            round ++;
        }
        if(de.roll(100) > 22) sHome++;
        if(round < 6 && (sAway + (6-round) < sHome || sHome + (5-round) < sAway)) {
            break;
        }
        if(de.roll(100) > 22) sAway++;
        done = 5 - (round + Math.abs(sHome-sAway)) < 0;
    }

    return {
        homeScore: sHome,
        awayScore: sAway
    }
}


var matchResolver = function (home,away) {
    let rT = rTGenerator(home,away);
    let eT, shootout, winner;
    if (rT.homeScore === rT.awayScore) {        
        eT = eTGenerator();
        if (eT.awayScore === eT.homeScore) {
            shootout = sGenerator();
            winner = (shootout.awayScore > shootout.homeScore) ? away : home;
        } else {
            winner = (eT.awayScore > eT.homeScore) ? away : home;
        }
    } else {
        winner = (rT.awayScore > rT.homeScore) ? away : home; 
    }
    return {
        regularTime: rT,
        extraTime: eT,
        shootout: shootout,
        winner: winner
    }
}


/**
 * EXPORTS
 */
exports.matchResolver = matchResolver;