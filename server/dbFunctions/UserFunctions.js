const kayn = require('../kayn.js');
const { updateSummoner } = require('./SummonerFunctions.js');
const { updateGamesAndMatches } = require('./GameFunctions.js');
const { updateLeagues } = require('./LeagueFunctions');
const updateUser = summonerName => {
  return kayn.Summoner.by.name(summonerName).then(summoner => {
    // Updates summoner row, returns { dataValues: {...} }
    let summonerPromise = updateSummoner(summoner);
    // Updates leagues rows, returns [{...}, ...]
    let leaguePromise = updateLeagues(summoner.id);
    // Updates games and matches row, returns { games: [{...}], matches: [{...}] }
    let gamesAndMatchesPromise = updateGamesAndMatches(summoner.accountId);
    return Promise.all([summonerPromise, gamesAndMatchesPromise, leaguePromise]).then(res => {
      const leagues = res[2];
      return { summoner: res[0].dataValues, ...res[1], leagues };
    });
  });
};

module.exports = {
  updateUser
};

// [
//   games {
//     dataValues: [Object],
//     _previousDataValues: [Object],
//     _changed: [Object],
//     _modelOptions: [Object],
//     _options: [Object],
//     isNewRecord: false,
//     null: undefined
//   },
//   [
//     [matches], [matches],
//     [matches], [matches],
//     [matches], [matches],
//     [matches], [matches],
//     [matches], [matches]
//   ]
// ],
