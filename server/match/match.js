const connection = require('../connectPG.js');
const { database, session } = connection.getConnections();
const kayn = require('../kayn.js');

const getMatches = (accountId, limit, verbose) => {
  const matchesTable = database.getTable('matches');
  return matchesTable
    .select()
    .where(`accountId like :accountId`)
    .bind('accountId', accountId)
    .orderBy(['gameId DESC'])
    .limit(limit)
    .execute()
    .then(result => {
      const rows = result.fetchAll();
      const keys = result.getColumns();
      const numRows = rows.length;
      const rowLength = rows[0].length || 0;
      let matches = [];
      for (let i = 0; i < numRows; i++) {
        let json = {};
        for (let j = 0; j < rowLength; j++) {
          json[keys[j].originalName] = rows[i][j];
        }
        matches[i] = json;
      }
      if (verbose) {
        for (let i = 0; i < 5; i++) {
          console.log(matches);
        }
      }
      return matches;
    });
};

module.exports = {
  getMatches
};

//
// { kayn summoner object
//   id: 'TMsSo8xx5sm4RVqUiUi0usbYLXAHirIeFi4lxv4RGkh7VE7Q',
//   accountId: 'e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac',
//   puuid: 'o_bQZxHCe49ExWxRqR2y5khdDKdSkfu1wHpdnJp_zCrS2rdcVgqqCUbA66S9Z-5SZge9985JVmT5GQ',
//   name: 'me arthur chen',
//   profileIconId: 3478,
//   revisionDate: 1586731319000,
//   summonerLevel: 89
// }
