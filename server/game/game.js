const connection = require('../connectSQL.js');
const kayn = require('../kayn.js');
const getGames = (accountId, limit, verbose) => {
  return connection
    .promise()
    .query(
      `select * from games as g where g.gameId IN 
      (select m.gameId from matches as m where accountId = ?) 
      order by g.gameId desc limit ?`,
      [accountId, limit]
    )
    .then(res => {
      return JSON.stringify(res[0]);
    })
    .catch(err => {
      console.error(err);
    });
};

const updateGamesAndMatches = async (accountId, verbose) => {
  // Get at most 100 most recent games stored in our DB.
  let mostRecentGames = await connection
    .promise()
    .query('select gameId from matches where accountId = ? order by gameId desc limit 100', [
      accountId
    ])
    .then(game => {
      // If the user doesn't have any matches stored, return -1.
      return game[0];
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
    summonerGames[game.gameId] = 1;
  });

  // For each gameId, only push the gameIds that the user doesn't have currently stored
  riotMatchList.forEach(match => {
    if (!summonerGames[match.gameId]) {
      gamesToAdd.push(match.gameId);
    }
  });

  console.log(gamesToAdd.length);
  // Then, create a corresponding row in matches and games for each missing gameId.
  let promises = [];
  gamesToAdd.forEach((gameId, index) => {
    promises.push(createGameAndMatch(gameId));
  });
  return Promise.all(promises);
};

const createGameAndMatch = async gameId => {
  const match = await kayn.Match.get(gameId)
    .then(match => match)
    .catch(err => {
      console.error(err);
    });
  if (match.mapId === 11 && withinTimeRange(match.gameCreation)) {
    const gamesValues = getGamesValues(gameId, match);
    const gamesQuestionMarks = createValuesQuery(gamesValues.length);
    const query =
      'INSERT IGNORE INTO games ' + getGamesKeys(false) + ' VALUES ' + gamesQuestionMarks;
    const gamesInsert = connection.promise().query(query, gamesValues);
    // Create a match row for each of the ten players
    let matchQuestionMarks = '';
    let matchArrayQuery = [];
    for (let i = 0; i < 10; i++) {
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
      const currMatchArray = getMatchValues(player, gameId, participantId, playerInfo, win);
      matchQuestionMarks += 'row' + createValuesQuery(currMatchArray.length);
      if (i != 9) matchQuestionMarks += ', ';
      matchArrayQuery = [...matchArrayQuery, ...currMatchArray];
    }

    const matchQuery =
      'insert ignore into matches ' + getMatchesKeys(false) + ' values ' + matchQuestionMarks;

    const matchesInsert = connection.promise().query(matchQuery, matchArrayQuery);
    return Promise.all([gamesInsert, matchesInsert]).catch(err => {
      console.error(err);
    });
  }
};

const withinTimeRange = gameCreation => {
  // 30 days in milliseconds
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  return new Date().getTime() - gameCreation < oneMonth;
};

const getGamesKeys = wantArray => {
  if (wantArray) {
    return [
      'gameId',
      'queueId',
      'gameDuration',
      'seasonId',
      'mapId',
      'gameType',
      'platformId',
      'gameVersion',
      'gameMode',
      'gameCreation'
    ];
  }
  return (
    '(gameId, queueId, gameDuration, seasonId, mapId, gameType, platformId,' +
    ' gameVersion, gameMode, gameCreation)'
  );
};

const getMatchesKeys = wantArray => {
  if (wantArray) {
    return [
      'accountId',
      'summonerName',
      'gameId',
      'role',
      'lane',
      'participantId',
      'championId',
      'teamId',
      'spell1Id',
      'spell2Id',
      'win',
      'kills',
      'deaths',
      'assists',
      'visionScore',
      'firstBloodAssist',
      'firstBloodKill',
      'goldEarned',
      'totalDamageDealtToChampions',
      'totalMinionsKilled',
      'neutralMinionsKilled',
      'neutralMinionsKilledTeamJungle',
      'neutralMinionsKilledEnemyJungle',
      'wardsPlaced',
      'visionWardsBoughtInGame',
      'item0',
      'item1',
      'item2',
      'item3',
      'item4',
      'item5',
      'item6',
      'perk0',
      'perk1',
      'perk2',
      'perk3',
      'perk4',
      'perk5',
      'perkPrimaryStyle',
      'perkSubStyle',
      'statPerk0',
      'statPerk1',
      'statPerk2'
    ];
  }
  return (
    '(accountId, summonerName, gameId, role, lane, participantId, championId, ' +
    'teamId, spell1Id, spell2Id, ' +
    'win, kills, deaths, assists, visionScore, firstBloodAssist, firstBloodKill, ' +
    'goldEarned, totalDamageDealtToChampions, totalMinionsKilled, ' +
    'neutralMinionsKilled, neutralMinionsKilledTeamJungle, ' +
    'neutralMinionsKilledEnemyJungle, wardsPlaced, visionWardsBoughtInGame, item0, ' +
    'item1, item2, item3, item4, item5, item6, perk0, perk1, perk2, perk3, perk4, ' +
    'perk5, perkPrimaryStyle, perkSubStyle, statPerk0, statPerk1, statPerk2)'
  );
};

const getGamesValues = (gameId, match) => {
  return [
    gameId,
    match.queueId,
    match.gameDuration,
    match.seasonId,
    match.mapId,
    `${match.gameType}`,
    `${match.platformId}`,
    `${match.gameVersion}`,
    `${match.gameMode}`,
    match.gameCreation
  ];
};

const getMatchValues = (player, gameId, participantId, playerInfo, win) => {
  const { stats, timeline } = playerInfo;

  return [
    `${player.accountId}`,
    `${player.summonerName}`,
    gameId,
    `${timeline.role}`,
    `${timeline.lane}`,
    participantId,
    playerInfo.championId,
    playerInfo.teamId,
    playerInfo.spell1Id,
    playerInfo.spell2Id,
    win,
    stats.kills,
    stats.deaths,
    stats.assists,
    stats.visionScore,
    stats.firstBloodAssist,
    stats.firstBloodKill,
    stats.goldEarned,
    stats.totalDamageDealtToChampions,
    stats.totalMinionsKilled,
    stats.neutralMinionsKilled,
    stats.neutralMinionsKilledTeamJungle,
    stats.neutralMinionsKilledEnemyJungle,
    stats.wardsPlaced,
    stats.visionWardsBoughtInGame,
    stats.item0,
    stats.item1,
    stats.item2,
    stats.item3,
    stats.item4,
    stats.item5,
    stats.item6,
    stats.perk0,
    stats.perk1,
    stats.perk2,
    stats.perk3,
    stats.perk4,
    stats.perk5,
    stats.perkPrimaryStyle,
    stats.perkSubStyle,
    stats.statPerk0,
    stats.statPerk1,
    stats.statPerk2
  ];
};

const testPopulate = async () => {
  const accountId = 'zbFRHD90fgf8JNbE-noGGdp5JHqXbW6zorwTIvupwz1K5ek';
  // Get the 100 most recent games played from Riot API
  const matchList = await kayn.Matchlist.by
    .accountID(accountId)
    .then(matches => {
      return matches;
    })
    .catch(err => {
      console.error(err);
    });

  let promises = [];
  for (let i = 0; i < 100; i++) {
    promises.push(createGameAndMatch(matchList.matches[i].gameId));
  }

  await Promise.all(promises)
    .then(() => {
      console.log('Success');
    })
    .catch(err => {
      console.error(err);
    });
};

const createValuesQuery = length => {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += '?';
    if (i !== length - 1) str += ', ';
  }

  return '(' + str + ')';
};

module.exports = {
  getGames,
  updateGamesAndMatches
};
