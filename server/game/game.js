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
  // Get the most recent game stored in our DB.
  let mostRecentGame = await connection
    .promise()
    .query('select gameId from matches where accountId = ? order by gameId desc limit 1', [
      accountId
    ])
    .then(game => {
      return game[0][0].gameId;
    });

  // Get the 100 most recent games played from Riot API
  const matchList = await kayn.Matchlist.by.accountID(accountId).then(matchlist => {
    return matchlist;
  });

  /**
   * Find the index that corresponds to the most recent index that we have stored.
   * This is so we can delete the correct number of games from our table, as well
   * as insert the correct number of new games
   */
  const mostRecentIndex = matchList.matches.findIndex(match => match.gameId === mostRecentGame);
  console.log(mostRecentIndex);
  /**
   * If the index is -1, then we couldn't find the game in the list. This means
   * the player has played 100 new games, since last updating, so simply delete
   * all previous matches, and insert all the new ones
   */

  if (mostRecentIndex === 0) {
  } else if (mostRecentIndex === -1) {
  } else {
    // Otherwise, get the current number of games stored
    const gamesList = await connection
      .promise()
      .query('select gameId from matches where accountId = ?', [accountId])
      .then(res => {
        return res[0];
      })
      .catch(err => {
        return undefined;
      });

    // if (!gamesList) {
    //   console.error(`Couldn't retrieve games list for account: ${accountId}`);
    //   console.error(
    //     'should replace this exit with some standardized error handling such that',
    //     'the api can return the correct error'
    //   );
    //   return;
    // }

    const gamesCount = gamesList.length;
    console.log(gamesCount);

    /**
     * If after we insert, we have more than 100 rows. First, delete all the oldest
     * MATCH rows necessary to ensure we stay at 100 rows per player.
     */
    if (gamesCount + mostRecentIndex > 100) {
      let matchesToBeDeleted = '(';
      // Accumulate the last 'mostRecentIndex' number of games o a string for our query.
      for (let i = gamesCount - 1; i >= gamesCount - mostRecentIndex; gamesCount--) {
        let gameId = gamesList[i][0].gameId;
        if (i === gamesCount - mostRecentIndex) matchesToBeDeleted += gameId + ')';
        else matchesToBeDeleted += gameId + ', ';
      }

      if (verbose) {
        console.log('Removing these matches:');
        console.log(matchesToBeDeleted);
      }

      // Delete all the matches found in the previously accumulated string for an account.
      let matchesDelete = await matchesTable
        .delete()
        .where(`accountId like :accountId AND gameId IN :inArrayString`)
        .bind('accountId', accountId)
        .bind('inArrayString', matchesToBeDeleted)
        .execute()
        .then(res => true)
        .catch(err => false);

      if (!matchesDelete) {
        console.error(`Couldn't delete matches for account: ${accountId}`);
        console.error(
          'should replace this exit with some standardized error handling such that',
          'the api can return the correct error'
        );
        return;
      }

      /**
       * Then, check if you can delete the corresponding GAMES row. We do this in separate
       * steps because another user can still be using this games row. Only until
       * all users (10 users per game) have stopped using this game, can we delete it.
       * Right here were finding the matches that still exist, and then we delete
       * the other ones
       */
      session
        .sql(
          `delete from games as g where g.gameId not in (
        select
          distinct m.gameId
        from 
          matches as m
        where
          m.gameId in ${matchesToBeDeleted}
      )`
        )
        .execute()
        .catch(err => console.error(err));
    }

    let promises = [];
    for (let i = 0; i < mostRecentIndex; i++) {
      const gameId = matchList.matches[i].gameId;
      // console.log(gameId);
      promises.push(createGameAndMatch(gameId));
    }

    return Promise.all(promises);
  }
};

const createGameAndMatch = async gameId => {
  const match = await kayn.Match.get(gameId)
    .then(match => match)
    .catch(err => {
      console.error(err);
    });
  if (match.mapId === 11) {
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
  const accountId = 'e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac';
  console.log(connection);
  connection.then(async res => {
    const { session, db } = res;
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
    for (let i = 0; i < 5; i++) {
      promises.push(createGameAndMatch(matchList.matches[i].gameId));
    }

    await Promise.all(promises)
      .then(() => {
        console.log('Success');
      })
      .catch(err => {
        console.error(err);
      });
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
