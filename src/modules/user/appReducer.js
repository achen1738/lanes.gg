import { GET_USER_DETAILS } from './actionTypes';
import Champions from '../../ddragon/data/en_US/champion.json';
import Summoner from '../../ddragon/data/en_US/summoner.json';
import Runes from '../../ddragon/data/en_US/runesReforged.json';
import Items from '../../ddragon/data/en_US/item.json';

/**
 * From the imported Champions json, create a mapping from
 * championID to info instead of championName to info.
 * @returns An object where the keys are champIDs and value is an object
 */
const createChampIDMapping = () => {
  const data = Champions.data;
  let mapping = {};
  // Iterate through each of the champions
  Object.keys(data).forEach((champName, index) => {
    // Map the key (number) to the rest of the object
    mapping[data[champName].key] = { ...data[champName] };
  });
  return mapping;
};

/**
 * From the imported Summoner json, create a mapping from summonerID
 * to info instead of summonerName to info
 * @returns An object where the keys are summonerIDs and value is an object
 */
const createSummonerIDMapping = () => {
  const data = Summoner.data;
  let mapping = {};
  Object.keys(data).forEach((summoner, index) => {
    mapping[data[summoner].key] = { ...data[summoner] };
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
  });
  return mapping;
};

/**
 * From the imported item json, store only the mapping from itemID
 * to info
 * @returns An object where the keys are runeIDs and value is an object
 */
const createItemIDMapping = () => {
  return Items.data;
};

const initialState = {
  matches: [],
  ddragon: createChampIDMapping(),
  summoner: createSummonerIDMapping(),
  runes: createRuneIDMapping(),
  items: createItemIDMapping()
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
    default:
      return state;
  }
}
