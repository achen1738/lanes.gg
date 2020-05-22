const { database } = require('../connectPG.js');
const kayn = require('../kayn.js');

const getSummoner = (summonerName, verbose) => {
  const summonerTable = database.getTable('summoner');
  return summonerTable
    .select(['*'])
    .where(`summonerName like :${summonerName}`)
    .limit(1)
    .execute()
    .then(async myResult => {
      const rows = myResult.fetchAll();
      if (verbose) {
        console.log('==== Summoner Rows ====');
        rows.forEach(row => {
          console.log(row);
        });
      }
      if (rows.length) {
        const summoner = await kayn.Summoner.by.name(summonerName);
        const currTime = new Date().getTime();
        summonerTable
          .insert([
            'accountId',
            'profileIconId',
            'summonerName',
            'updatedAt',
            'id',
            'puuid',
            'summonerLevel'
          ])
          .values(
            summoner.accountId,
            summoner.profileIconId,
            summonerName,
            currTime,
            summoner.id,
            summoner.puuid,
            summoner.summonerLevel
          )
          .execute();
        rows[0] = createSummonerObject(summonerName, summoner, currTime);
      }
      return rows[0];
    });
};

const updateSummoner = (summonerName, verbose) => {
  return kayn.Summoner.by.name(summonerName).then(summoner => {
    if (verbose) {
      console.log('==== Summoner ====');
      console.log(summoner);
    }
    const summonerTable = database.getTable('summoner');
    return summonerTable
      .update()
      .set('profileIconId', summoner.profileIconId)
      .set('summonerLevel', summoner.summonerLevel)
      .set('updatedAt', new Date().getTime())
      .where(`summonerName like :${summonerName}`)
      .limit(1)
      .execute();
  });
};

const createSummonerObject = (summonerName, kaynSummoner, currTime, verbose) => {
  return {
    accountId: kaynSummoner.accountId,
    profileIconId: kaynSummoner.profileIconId,
    summonerName: summonerName,
    updatedAt: currTime,
    id: summoner.id,
    puuid: summoner.puuid,
    summonerLevel: summoner.summonerLevel
  };
};

module.exports = {
  getSummoner,
  updateSummoner
};

// { kayn summoner object
//   id: 'TMsSo8xx5sm4RVqUiUi0usbYLXAHirIeFi4lxv4RGkh7VE7Q',
//   accountId: 'e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac',
//   puuid: 'o_bQZxHCe49ExWxRqR2y5khdDKdSkfu1wHpdnJp_zCrS2rdcVgqqCUbA66S9Z-5SZge9985JVmT5GQ',
//   name: 'me arthur chen',
//   profileIconId: 3478,
//   revisionDate: 1586731319000,
//   summonerLevel: 89
// }
