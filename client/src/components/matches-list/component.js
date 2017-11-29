const matches = require('../../../../server/src/resolvers.js').tour.matches;

module.exports = {
   matches: matches,
   onMatchClick: (match) => {
     console.log(match.result.diff);
  }
};
