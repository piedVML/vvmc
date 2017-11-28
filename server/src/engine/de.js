const isNumeric = require('../tools/is_numeric');

var roll = function (numSides) {
    numSides = (numSides !== undefined && Number.isInteger(numSides)) ? Math.abs(numSides) : 100;
    return 1 + (Math.floor(Math.random() * numSides));
}

/**
 * EXPORTS
 */
exports.roll = roll;