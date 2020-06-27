import { GET_USER_DETAILS, GET_DDRAGON } from './actionTypes';
import Runes from '../../ddragon/data/en_US/runesReforged.json';
import { DisplayMatches, UserMatches, Summoner, Leagues, Games } from '../../mock/correct';

const modifyUserMatches = () => {
  const userMatches = UserMatches.userMatches;
  let mapping = {};
  userMatches.forEach(match => {
    mapping[match.gameId] = match;
  });
  return mapping;
};

/**
 * From the imported RunesReforged json, create a mapping from runeID
 * to info instead of rune name to info
 * @returns An object where the keys are runeIDs and value is an object
 */
const createRuneIDMapping = () => {
  let mapping = {};
  Runes.forEach(tree => {
    tree.slots.forEach(slot => {
      slot.runes.forEach(rune => {
        mapping[rune.id] = { ...rune };
      });
    });
    mapping[tree.id] = {
      key: tree.key,
      icon: tree.icon,
      name: tree.name
    };
  });
  return mapping;
};

const initialState = {
  matches: [],
  champions: {},
  summonerSpells: {},
  runes: createRuneIDMapping(),
  items: {},

  displayMatches: DisplayMatches.displayMatches,
  userMatches: modifyUserMatches(),
  summoner: Summoner.summoner,
  leagues: Leagues.leagues,
  games: Games.games
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAILS.PENDING:
      return state;
    case GET_USER_DETAILS.SUCCESS:
      return Object.assign({}, state, {
        matches: action.matches
      });
    case GET_USER_DETAILS.ERROR:
      return state;
    case GET_DDRAGON.PENDING:
      return state;
    case GET_DDRAGON.SUCCESS:
      return Object.assign({}, state, {
        items: action.items,
        summonerSpells: action.summonerSpells,
        champions: action.champions
      });
    case GET_DDRAGON.ERROR:
      return state;
    default:
      return state;
  }
}
