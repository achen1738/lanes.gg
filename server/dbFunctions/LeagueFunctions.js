const db = require('../MySQL.js');
const { leagues: Leagues } = db;
const kayn = require('../kayn.js');

const getLeagues = summonerId => {
  return Leagues.findAll({
    where: {
      summonerId
    }
  }).then(tempLeagues => {
    return tempLeagues.map(league => league.dataValues);
  });
};

const updateLeagues = async summonerId => {
  const kaynPromise = kayn.League.Entries.by.summonerID(summonerId);
  const leaguePromise = Leagues.findAll({
    where: {
      summonerId
    }
  });

  const [kaynLeagues, userLeagues] = await Promise.all([kaynPromise, leaguePromise]);
  let updatedLeaguesArray = [];
  kaynLeagues.forEach(kaynLeague => {
    const userLeague = userLeagues.find(
      userLeague => kaynLeague.queueType === userLeague.dataValues.queueType
    );

    // If there isn't a user league for this queue type, create a new league row.
    if (!userLeague) {
      const newLeagueRow = createLeagueRow(kaynLeague);
      updatedLeaguesArray.push(newLeagueRow);
    } else {
      if (needToUpdate(userLeague.dataValues, kaynLeague)) {
        setLeagueObject(userLeague, kaynLeague);

        userLeague.save();
      }
      updatedLeaguesArray.push(userLeague.dataValues);
    }
  });

  return updatedLeaguesArray;
};

const needToUpdate = (userLeague, kaynLeague) => {
  let sameTier = userLeague.tier !== kaynLeague.tier;
  let sameDivision = userLeague.division !== kaynLeague.rank;
  let sameLP = userLeague.leaguePoints !== kaynLeague.leaguePoints;
  let bool = sameTier || sameDivision || sameLP;
  return bool;
};

const createLeagues = async summonerId => {
  const kaynLeague = await kayn.League.Entries.by.summonerID(summonerId);
  let leagues = [];
  kaynLeague.forEach(league => {
    leagues.push(createLeagueRow(league));
  });
  return leagues;
};

const createLeagueRow = kaynLeague => {
  const leagueObj = createLeagueObject(kaynLeague);
  Leagues.create(leagueObj);
  return leagueObj;
};

const createLeagueObject = kaynLeague => {
  const leagueObj = ({
    summonerName,
    summonerId,
    queueType,
    tier,
    leaguePoints,
    wins,
    losses
  } = kaynLeague);
  leagueObj.division = kaynLeague.rank;
  if (kaynLeague.miniSeries) {
    leagueObj.seriesWins = kaynLeague.miniSeries.wins;
    leagueObj.seriesTarget = kaynLeague.miniSeries.target;
    leagueObj.seriesLosses = kaynLeague.miniSeries.losses;
  }
  return leagueObj;
};

const setLeagueObject = (toBeSetObject, kaynLeague) => {
  toBeSetObject.tier = kaynLeague.tier;
  toBeSetObject.division = kaynLeague.rank;
  toBeSetObject.leaguePoints = kaynLeague.leaguePoints;
  toBeSetObject.wins = kaynLeague.wins;
  toBeSetObject.losses = kaynLeague.losses;
  if (kaynLeague.miniSeries) {
    toBeSetObject.seriesWins = kaynLeague.miniSeries.wins;
    toBeSetObject.seriesLosses = kaynLeague.miniSeries.losses;
    toBeSetObject.seriesTarget = kaynLeague.miniSeries.target;
  } else {
    toBeSetObject.seriesWins = 0;
    toBeSetObject.seriesLosses = 0;
    toBeSetObject.seriesTarget = 0;
  }
  return toBeSetObject;
};

module.exports = {
  createLeagues,
  getLeagues,
  updateLeagues
};

// const test = [
//   {
//     leagueId: '67214aa9-e6da-4e69-b602-cbc8b009b8db',
//     queueType: 'RANKED_SOLO_5x5',
//     tier: 'GOLD',
//     rank: 'III',
//     summonerId: '4x7YE4nR_KN5aTXdag7XH__5VgriYRkefgVXEVPvdlMFsEE',
//     summonerName: 'Born To Kill 200',
//     leaguePoints: 23,
//     wins: 52,
//     losses: 48,
//     veteran: false,
//     inactive: false,
//     freshBlood: false,
//     hotStreak: false
//   },
//   {
//     leagueId: '587c4213-87f2-410d-ba7f-12d603a822d1',
//     queueType: 'RANKED_FLEX_SR',
//     tier: 'GOLD',
//     rank: 'II',
//     summonerId: '4x7YE4nR_KN5aTXdag7XH__5VgriYRkefgVXEVPvdlMFsEE',
//     summonerName: 'Born To Kill 200',
//     leaguePoints: 56,
//     wins: 55,
//     losses: 33,
//     veteran: false,
//     inactive: false,
//     freshBlood: true,
//     hotStreak: false
//   }
// ];
