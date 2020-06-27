const { ChampionsQueries, ChampionsMutations } = require('./ChampionsResolver');
const { ItemsQueries, ItemsMutations } = require('./ItemsResolver');
const { MapsQueries, MapsMutations } = require('./MapsResolver');
const { ProfileIconsQueries, ProfileIconsMutations } = require('./ProfileIconsResolver');
const { RunesQueries, RunesMutations } = require('./RunesResolver');
const { SummonerSpellsQueries, SummonerSpellsMutations } = require('./SummonerSpellsResolver');

const DDragonQueries = {
  ...ChampionsQueries,
  ...ItemsQueries,
  ...MapsQueries,
  ...ProfileIconsQueries,
  ...RunesQueries,
  ...SummonerSpellsQueries
};

const DDragonMutations = {
  ...ChampionsMutations,
  ...ItemsMutations,
  ...MapsMutations,
  ...ProfileIconsMutations,
  ...RunesMutations,
  ...SummonerSpellsMutations
};
module.exports = { DDragonQueries, DDragonMutations };
