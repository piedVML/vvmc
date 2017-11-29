const clubs = require('../../../../server/src/resolvers.js').clubs;

module.exports = {
  getClubs: () => clubs,
  onClubClick: (club) => {
    console.log(club);
  }
};

