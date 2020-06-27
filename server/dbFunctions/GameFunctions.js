const connection = require('../connectSQL.js');
const db = require('../MySQL.js');
const { matches: Matches, games: Games } = db;
const kayn = require('../kayn.js');

const getGames = (accountId, limit, verbose) => {
  const tempSQL = db.sequelize.dialect.QueryGenerator.selectQuery('matches', {
    attributes: ['gameId'],
    where: {
      accountId
    }
  }).slice(0, -1); // to remove the ';' from the end of the SQL

  return Games.findAll({
    where: {
      gameId: {
        [db.Sequelize.Op.in]: db.sequelize.literal(`(${tempSQL})`)
      }
    },
    order: [['gameId', 'DESC']],
    limit
  }).then(res => {
    return res.map(match => match.dataValues);
  });
};

const updateGamesAndMatches = async (accountId, verbose) => {
  // Get at most 100 most recent games stored in our DB.
  const mostRecentGames = await Matches.findAll({
    attributes: ['gameId'],
    where: {
      accountId
    }
  });

  // Get the 100 most recent games played from Riot API
  const riotMatchListObj = await kayn.Matchlist.by.accountID(accountId).then(matchlist => {
    return matchlist;
  });
  const riotMatchList = riotMatchListObj.matches;

  /**
   * Storing all the user's (summoner) games in a map, such that we can find
   * what games the user doesn't have stored in O(1). The reason we dont just
   * look at all the games before the most recently stored game is because
   * a different user could have inserted this, meaning there is now a gap
   * of missing games
   */
  let summonerGames = {};
  let gamesToAdd = [];

  mostRecentGames.forEach(game => {
    summonerGames[game.dataValues.gameId] = 1;
  });

  // For each gameId, only push the gameIds that the user doesn't have currently stored
  riotMatchList.forEach(match => {
    if (!summonerGames[match.gameId]) {
      gamesToAdd.push(match.gameId);
    }
  });

  console.log(gamesToAdd.length);

  // TODO: Maybe a bulk insert is better here (Get all of the Kayn games, and
  //then make two big inserts)

  // Then, create a corresponding row in matches and games for each missing gameId.
  return db.sequelize.transaction(async t => {
    let promises = [];
    gamesToAdd.forEach((gameId, index) => {
      promises.push(createGameAndMatch(gameId));
    });
    return Promise.all(promises).then(res => {
      let games = [];
      let matches = [];
      res.forEach((gameAndMatch, index) => {
        // If it is a valid summoners rift game
        if (gameAndMatch.length) {
          const [game, match] = gameAndMatch;
          games.push(game.dataValues);
          matches.push(match.map(dbMatch => dbMatch.dataValues));
        }
      });
      return { games, matches };
    });
  });
};

const createGameAndMatch = async gameId => {
  const match = await kayn.Match.get(gameId)
    .then(match => match)
    .catch(err => {
      console.error(err);
    });
  if (match.mapId === 11 && withinTimeRange(match.gameCreation)) {
    let gamesToCreate = [];
    // Create a match row for each of the ten players
    for (let i = 0; i < 10; i++) {
      const teams = match.teams;
      const { player, participantId } = match.participantIdentities[i];
      let playerInfo = match.participants[i];
      const { stats } = playerInfo;
      /**
       * In case the indexes for participants and participantIdentities don't
       * match up, manually find the participant with the corresponding ID
       */
      if (participantId !== playerInfo.participantId) {
        playerInfo = match.participantIdentities.find(playerIdent => {
          return participantId === playerIdent.participantId;
        });
      }
      const win = stats.win ? 1 : 0;
      const teamIndex = participantId <= 5 ? 0 : 1;
      const insideTeamIndex = participantId - 1 - teamIndex * 5;
      const bans = teams[teamIndex].bans;
      const ban = bans.length ? bans[insideTeamIndex].championId : -1;
      const matchObj = createMatchObject(player, gameId, participantId, playerInfo, win, ban);
      gamesToCreate.push(matchObj);
    }

    const gamesObj = createGameObject(gameId, match);
    const gamesInsert = Games.create(gamesObj, { ignoreDuplicates: true });
    const matchesInsert = Matches.bulkCreate(gamesToCreate, { ignoreDuplicates: true });
    return Promise.all([gamesInsert, matchesInsert]).catch(err => {
      console.error(err);
    });
  }
  return [];
};
//
const withinTimeRange = gameCreation => {
  // 30 days in milliseconds
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  return new Date().getTime() - gameCreation < oneMonth;
};

const createGameObject = (gameId, match) => {
  return {
    gameId,
    queueId: match.queueId,
    gameDuration: match.gameDuration,
    seasonId: match.seasonId,
    mapId: match.mapId,
    gameType: match.gameType,
    platformId: match.platformId,
    gameVersion: match.gameVersion,
    gameMode: match.gameMode,
    gameCreation: match.gameCreation
  };
};

const createMatchObject = (player, gameId, participantId, playerInfo, win, ban) => {
  const { stats, timeline } = playerInfo;

  const {
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
    statPerk2,
    champLevel
  } = stats;

  return {
    accountId: player.accountId,
    summonerName: player.summonerName,
    gameId,
    role: timeline.role,
    lane: timeline.lane,
    participantId,
    championId: playerInfo.championId,
    teamId: playerInfo.teamId,
    spell1Id: playerInfo.spell1Id,
    spell2Id: playerInfo.spell2Id,
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
    statPerk2,
    champLevel,
    ban
  };
};

module.exports = {
  getGames,
  updateGamesAndMatches
};
