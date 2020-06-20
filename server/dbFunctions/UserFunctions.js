const kayn = require('../kayn.js');
const { updateSummoner } = require('./SummonerFunctions.js');
const { updateGamesAndMatches } = require('./GameFunctions.js');

const updateUser = (summonerName, verbose) => {
  return kayn.Summoner.by.name(summonerName).then(summoner => {
    let summonerPromise = updateSummoner(summoner);
    let gamesAndMatchesPromise = updateGamesAndMatches(summoner.accountId);
    return Promise.all([summonerPromise, gamesAndMatchesPromise]).then(res => {
      let games = [];
      let matches = [];
      res[1].forEach((gameAndMatch, index) => {
        // If it is a valid summoners rift game
        if (gameAndMatch.length) {
          const [game, match] = gameAndMatch;
          games.push(game.dataValues);
          matches.push(match.map(dbMatch => dbMatch.dataValues));
        }
      });

      return { summoner: res[0].dataValues, games, matches };
    });
  });
};

module.exports = {
  updateUser
};
//

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
