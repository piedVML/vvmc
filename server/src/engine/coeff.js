const isNumeric = require('../tools/is_numeric');
const optionsValidator = require('../tools/options_validator');

/**
 * Génère un coeff aélatoirement
 * @param {*} options (min/max)
 */
var randomCoeffGenerator = function (options) {
	let isValid = optionsValidator(options,["min","max"]);
	let cMin = (isValid && isNumeric(options.min)) ? options.min : 0;
	let cMax = (isValid && isNumeric(options.max)) ? options.max : 100;
	return cMin + (Math.random()*cMax);
};


var randomCoeffArrayGenerator = function() {
	let coeffArray = [];
	for (let i = 0; i < 5; ++i){
		coeffArray.push(randomCoeffGenerator({ min: 0, max: 20 }));
	}
	return coeffArray;
}


var aggregateCoeff = function(array) {
	let aggregate = 0;
	for(let i = 0; i < array.length > 5 ? 5 : array.length; ++i) {
		aggregate += array[i];
	}
	return aggregate;
}


/**
 * Détermine le rapport de force (ratio) entre deux équipes
 * @param {club} home 
 * @param {club} away 
 */
var matchRatio = function(home,away) {	
    if(!optionsValidator(home,["totalCoeff"]) || !optionsValidator(away,["totalCoeff"])) {
        throw new NE.InvalidArgumentException("Impossible de lire le coeff total des clubs", home, away);
	}
	
	return ratioLimiter(coeffMin(home.totalCoeff)/coeffMin(away.totalCoeff));
}


/**
 * Empêche un coeff à 0
 * @param {num} coeff 
 */
var coeffMin = function(coeff) {
	if(!isNumeric(coeff)) {
		throw {
			message: "coeff non numérique",
			dateTime: new Date()
		}		
	}

	return (coeff === 0) ? 0.00001 : coeff; 
}

/**
 * Limite le ratio entre deux équipes
 * @param {num} ratio 
 */
var ratioLimiter = function(ratio,options) {
	if(!isNumeric(ratio)) {
		throw {
			message: "ratio non numérique",
			dateTime: new Date()
		}		
	}

	let validOptions = optionsValidator(options, ["min","max"]) && isNumeric(options.min) && isNumeric(options.max) && options.min < options.max;
	rMin = (validOptions) ? options.min : 0.5;
	rMax = (validOptions) ? options.max : 2;

	// ratio compris entre 0.5 et 2 (défaut)
	ratio = (ratio < rMin) ? rMin : (ratio > rMax) ? rMax : ratio;
	return ratio;
}




/**
 * EXPORTS
 */
exports.randomCoeffGenerator = randomCoeffGenerator;
exports.randomCoeffArrayGenerator = randomCoeffArrayGenerator;
exports.aggregateCoeff = aggregateCoeff;
exports.matchRatio = matchRatio;