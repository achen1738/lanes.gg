const kayn = require('../kayn.js');
const { updateSummoner } = require('../summoner/summoner.js');
const { updateGamesAndMatches } = require('../game/game.js');
const updateUser = (summonerName, verbose) => {
  return kayn.Summoner.by
    .name(summonerName)
    .then(summoner => {
      let summonerPromise = updateSummoner(summoner);
      let gamesAndMatchesPromise = updateGamesAndMatches(summoner.accountId);
      return Promise.all([summonerPromise, gamesAndMatchesPromise])
        .then(res => {
          console.log('Success');
        })
        .catch(err => {
          console.error(err);
          return 503;
        });
    })
    .catch(err => {
      console.error(err);
    });
};
