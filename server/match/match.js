const { database } = require('../connectPG.js');
const kayn = require('../kayn.js');

const getMatches = (accountId, limit, verbose) => {
  const matchesTable = database.getTable('matches');
  return matchesTable
    .select(['*'])
    .where(`accountId like :${accountId}`)
    .orderBy(['gameId DESC'])
    .limit(limit)
    .execute()
    .then(result => {
      const matches = result.fetchAll();
      if (verbose) {
        for (let i = 0; i < 5; i++) {
          console.log(matches[i]);
        }
      }
      return matches;
    });
};

module.exports = {
  getMatches
};
