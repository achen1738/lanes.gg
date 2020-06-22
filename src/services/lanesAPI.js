import Matches from '../mock/matches.json';
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000';

export const getFakeMatchesApi = username => {
  return Matches;
};

export const getAnalysis = gameId => {
  return axios({
    url: '/graphql/',
    method: 'post',
    data: {
      query: `
        query {
      
        }
      `
    }
  });
};

export const getAllInfo = (summonerName, limit) => {
  return axios({
    url: '/graphql/',
    method: 'post',
    data: {
      query: `
        query {
          summoner(summonerName: "born to kill 200") {
            summonerName,
            summonerLevel,
            profileIconId,
            getLeagues {
              queueType,
              tier,
              division,
              leaguePoints,
              wins,
              losses,
              seriesWins,
              seriesLosses,
              seriesTarget
            },
            getUserMatches(limit: 1) {
              summonerName,
              gameId,
              participantId,
              championId,
              teamId,
              spell1Id,
              spell2Id,
              win,
              kills,
              deaths,
              assists,
              visionScore,
              firstBloodAssist,
              firstBloodKill,
              goldEarned,
              totalDamageDealtToChampions,
              totalMinionsKilled,
              neutralMinionsKilled,
              neutralMinionsKilledTeamJungle,
              neutralMinionsKilledEnemyJungle,
              wardsPlaced,
              visionWardsBoughtInGame,
              item0,
              item1,
              item2,
              item3,
              item4,
              item5,
              item6,
              perk0,
              perk1,
              perk2,
              perk3,
              perk4,
              perk5,
              perkPrimaryStyle,
              perkSubStyle,
              statPerk0,
              statPerk1,
              statPerk2
            },
            getDisplayMatches(limit: 1) {
              summonerName,
              gameId,
              participantId,
              championId,
              teamId
            },
            getGames(limit: 1) {
              gameId,
              queueId,
              gameDuration,
              seasonId,
              mapId,
              gameType,
              gameCreation,
              gameMode
            }
          }
        }
        `
    }
  });
};
