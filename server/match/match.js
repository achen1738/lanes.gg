const connection = require('../connectSQL.js');

const getMatches = (accountId, limit, verbose) => {
  return connection
    .promise()
    .query('select * from matches where accountId = ? order by gameId desc limit ?', [
      accountId,
      limit
    ])
    .then(res => {
      return JSON.stringify(res[0]);
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
