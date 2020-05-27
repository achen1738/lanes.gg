const connection = require('../connectSQL.js');
const kayn = require('../kayn.js');
const getSummoner = (summonerName, verbose) => {
  return connection
    .promise()
    .query('select * from summoner where summonerName = ? limit 1', [summonerName])
    .then(async summoner => {
      if (!summoner.length) {
        const kaynSummoner = await kayn.Summoner.by.name(summonerName);
        const currTime = new Date().getTime();
        const values = getSummonerValues(summonerName, kaynSummoner, currTime);
        connection.query(
          'insert into summoner (accountId, profileIconId, summonerName, updatedAt, id, puuid, summonerLevel) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [...values],
          (insertErr, insertRes) => {
            if (insertErr) {
              console.error(insertErr);
            }
          }
        );
        summoner[0] = createSummonerObject(summonerName, kaynSummoner, currTime);
      }
      if (verbose) {
        console.log(summoner);
      }
      return JSON.stringify(summoner);
    });
};

const updateSummoner = (summonerName, verbose) => {
  return kayn.Summoner.by.name(summonerName).then(summoner => {
    const currTime = new Date().getTime();
    const values = getSummonerValues(summonerName, summoner, currTime);
    const summonerObject = createSummonerObject(summonerName, summoner, currTime);
    const updates = getSummonerUpdates(summoner, currTime);
    const query =
      'insert into summoner (accountId, profileIconId, summonerName, updatedAt, id, puuid, summonerLevel) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE updatedAt=?, profileIconId=?, summonerLevel=?';

    return connection
      .promise()
      .query(query, [...values, ...updates])
      .then(res => {
        console.log(summonerObject);
        return summonerObject;
      });
  });
};

const getSummonerKeys = () => {
  return [
    'accountId',
    'profileIconId',
    'summonerName',
    'updatedAt',
    'id',
    'puuid',
    'summonerLevel'
  ];
};

const getSummonerValues = (summonerName, summoner, currTime) => {
  return [
    `${summoner.accountId}`,
    summoner.profileIconId,
    `${summonerName}`,
    currTime,
    `${summoner.id}`,
    `${summoner.puuid}`,
    summoner.summonerLevel
  ];
};

const createSummonerObject = (summonerName, kaynSummoner, currTime) => {
  return {
    accountId: kaynSummoner.accountId,
    profileIconId: kaynSummoner.profileIconId,
    summonerName: summonerName,
    updatedAt: currTime,
    id: kaynSummoner.id,
    puuid: kaynSummoner.puuid,
    summonerLevel: kaynSummoner.summonerLevel
  };
};

const getSummonerUpdates = (summoner, currTime) => {
  return [currTime, summoner.profileIconId, summoner.summonerLevel];
};

module.exports = {
  getSummoner,
  updateSummoner
};
//
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
