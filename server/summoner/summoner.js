// const connection = require('../connectSQL.js');
const db = require('../MySQL.js');
const { summoner: Summoner } = db;
const kayn = require('../kayn.js');

const getSummoner = (summonerName, verbose) => {
  return Summoner.findAll({
    where: {
      summonerName: summonerName
    },
    limit: 1
  }).then(async summ => {
    if (!summ.length) {
      const kaynSummoner = await kayn.Summoner.by.name(summonerName);
      const currTime = new Date().getTime();
      const summonerObj = createSummonerObject(kaynSummoner, currTime);
      console.log(summonerObj);
      Summoner.create({
        ...summonerObj
      });
      summ[0] = { dataValues: summonerObj };
    }
    if (verbose) {
      console.log(summ[0].dataValues);
    }
    return JSON.stringify(summ[0].dataValues);
  });
};

const updateSummoner = (summoner, verbose) => {
  return db.sequelize.transaction(async t => {
    const currTime = new Date().getTime();
    const updateObj = createSummonerObject(summoner, currTime);
    return await Summoner.update(updateObj, {
      where: {
        summonerName: summoner.name
      }
    });
  });
};

const createSummonerObject = (summoner, currTime) => {
  return {
    accountId: summoner.accountId,
    profileIconId: summoner.profileIconId,
    summonerName: summoner.name,
    updatedAtTS: currTime,
    id: summoner.id,
    puuid: summoner.puuid,
    summonerLevel: summoner.summonerLevel
  };
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
