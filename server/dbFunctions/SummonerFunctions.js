// const connection = require('../connectSQL.js');
const db = require('../MySQL.js');
const { summoner: Summoner, leagues: Leagues } = db;
const kayn = require('../kayn.js');
const { createLeagues } = require('./LeagueFunctions.js');

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
      db.sequelize.transaction(async t => {
        createLeagues(kaynSummoner.id);
        const summonerObj = createSummonerObject(kaynSummoner, currTime);
        Summoner.create({
          ...summonerObj
        });
      });
      summ[0] = { dataValues: summonerObj };
    }
    if (verbose) {
    }
    return summ[0].dataValues;
  });
};

const updateSummoner = (summoner, verbose) => {
  return db.sequelize.transaction(async t => {
    const foundSum = await Summoner.findOne({ where: { summonerName: summoner.name } });
    if (foundSum) {
      const updatedSum = updateSummonerHelper(foundSum, summoner);
      return updatedSum.save();
    }
    return [{ dataValues: {} }];
  });
};

const updateSummonerHelper = (updateObj, summoner) => {
  const currTime = new Date().getTime();
  updateObj.summonerLevel = summoner.summonerLevel;
  updateObj.updatedAtTS = currTime;
  updateObj.profileIconId = summoner.profileIconId;
  updateObj.summonerName = summoner.name;
  return updateObj;
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
