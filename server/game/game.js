const connection = require('../connectPG.js');
const { database, session } = connection.getConnections();
const kayn = require('../kayn.js');
const getGames = (accountId, limit, verbose) => {
  return session
    .sql(
      `select * from games as g where g.gameId IN 
      (select m.gameId from matches as m where accountId = "${accountId}") 
      order by g.gameId desc limit ${limit}`
    )
    .execute()
    .then(res => {
      const rows = res.fetchAll();
      console.log(res.fetchOne());
      if (verbose) {
        for (let i = 0; i < 5; i++) {
          console.log(rows[i]);
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const updateGamesAndMatches = async (accountId, verbose) => {
  const gamesTable = database.getTable('games');
  const matchesTable = database.getTable('matches');

  // Get the most recent game stored in our DB.
  let mostRecentGame = await gamesTable
    .select(['gameId'])
    .where(`accountId like :${accountId}`)
    .orderBy(['gameCreation DESC'])
    .limit(1)
    .execute()
    .then(result => {
      return result.fetchOne();
    });

  if (mostRecentGame.gameId) {
    console.log('should not be getting here, if so return field instead of obj');
    mostRecentGame = mostRecentGame.gameId;
  }

  // Get the 100 most recent games played from Riot API
  const matchList = await kayn.Matchlist.by.accountID(accountId).then(matchlist => {
    return matchList;
  });

  /**
   * Find the index that corresponds to the most recent index that we have stored.
   * This is so we can delete the correct number of games from our table, as well
   * as insert the correct number of new games
   */
  const mostRecentIndex = matchList.findIndex(match => match.gameId === mostRecentGame);

  /**
   * If the index is -1, then we couldn't find the game in the list. This means
   * the player has played 100 new games, since last updating, so simply delete
   * all previous matches, and insert all the new ones
   */
  if (mostRecentIndex === -1) {
  } else {
    // Otherwise, get the current number of games stored
    const gamesList = await gamesTable
      .select(['*'])
      .where(`accountId like :accountId`)
      .bind('accountId', accountId)
      .execute()
      .then(result => {
        return result.fetchAll();
      })
      .catch(err => {
        return undefined;
      });

    if (!gamesList) {
      console.error(`Couldn't retrieve games list for account: ${accountId}`);
      console.error(
        'should replace this exit with some standardized error handling such that',
        'the api can return the correct error'
      );
      exit();
    }
    const gamesCount = gamesList.length;
    let deletedMatches = [];
    /**
     * If after we insert, we have more than 100 rows. First, delete all the oldest
     * MATCH rows necessary to ensure we stay at 100 rows per player.
     */
    if (gamesCount + mostRecentIndex > 100) {
      let matchesToBeDeleted = '(';
      // Accumulate the last 'mostRecentIndex' number of games o a string for our query.
      for (let i = gamesCount - 1; i >= gamesCount - mostRecentIndex; gamesCount--) {
        let gameId = gamesList[i].gameId;
        deletedMatches.push(gameId);
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
        exit();
      }

      /**
       * Then, check if you can delete the corresponding GAMES row. We do this in separate
       * steps because another user can still be using this games row. Only until
       * all users (10 users per game) have stopped using this game, can we delete it.
       * Right here were finding the matches that still exist, and then we delete
       * the other ones
       */
      let matchesSelect = await matchesTable
        .select(['UNIQUE gameId'])
        .where(`gameId IN :inArrayString`)
        .bind('inArrayString', matchesToBeDeleted)
        .execute()
        .then(result => result.fetchAll())
        .catch(err => undefined);

      if (!matchesSelect) {
        console.error(`Couldn't select matches for account: ${accountId}`);
        console.error(
          'should replace this exit with some standardized error handling such that',
          'the api can return the correct error'
        );
        exit();
      }

      let foundGames = {};
      let gamesToBeDeleted = '(';
      matchesSelect.forEach(gameId => (foundGames[gameId] = true));
      deletedMatches.forEach(gameId => {
        if (!foundGames[gameId]) gamesToBeDeleted += gameId + ', ';
      });
      gamesToBeDeleted = gamesToBeDeleted.slice(0, -2) + ')';
      if (verbose) {
        console.log('Deleting these games');
        console.log(gamesToBeDeleted);
      }

      let deletedGames = await gamesTable
        .delete()
        .where('gameId in :gamesToBeDeleted')
        .bind('gamesToBeDeleted', gamesToBeDeleted)
        .execute()
        .then(() => true)
        .catch(err => false);

      if (!deletedGames) {
        console.error(`Couldn't delete games for account: ${accountId}`);
        console.error(
          'should replace this exit with some standardized error handling such that',
          'the api can return the correct error'
        );
        exit();
      }
    }

    let promises = [];
    for (let i = 0; i < mostRecentIndex; i++) {
      const gameId = matchList[i].gameId;
      promises.push(createGameAndMatch(gameId));
    }

    return Promise.all(promises);
    // session.sql(`INSERT IGNORE INTO games ${getGamesKeys} VALUES ()`);
  }
};

const createGameAndMatch = async gameId => {
  const match = await kayn.Match.get(gameId)
    .then(match => match)
    .catch(err => {
      console.error(err);
    });
  if (match.mapId === 11) {
    const gamesInsert = session.sql(
      `INSERT IGNORE INTO games ${getGamesKeys(false)} VALUES ${getGamesValues(gameId, match)}`
    );

    // Create a match row for each of the ten players
    let matchValuesString = '';
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
      matchValuesString += getMatchValues(player, gameId, participantId, playerInfo, stats, win);

      if (i != 9) matchValuesString += ', ';
    }

    const matchesInsert = session.sql(
      `INSERT IGNORE INTO MATCHES ${getMatchesKeys(false)} VALUES ${matchValuesString}`
    );

    return Promise.all([gamesInsert.execute(), matchesInsert.execute()]).catch(err => {
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
  return '(gameId, queueId, gameDuration, seasonId, mapId, gameType, platformId, gameVersion, gameMode, gameCreation)';
};

const getMatchesKeys = wantArray => {
  if (wantArray) {
    return [
      'accountId',
      'summonerName',
      'gameId',
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
    '(accountId, summonerName, gameId, participantId, championId, teamId, spell1Id, spell2Id, ' +
    'win, kills, deaths, assists, visionScore, firstBloodAssist, firstBloodKill, ' +
    'goldEarned, totalDamageDealtToChampions, totalMinionsKilled, ' +
    'neutralMinionsKilled, neutralMinionsKilledTeamJungle, ' +
    'neutralMinionsKilledEnemyJungle, wardsPlaced, visionWardsBoughtInGame, item0, ' +
    'item1, item2, item3, item4, item5, item6, perk0, perk1, perk2, perk3, perk4, ' +
    'perk5, perkPrimaryStyle, perkSubStyle, statPerk0, statPerk1, statPerk2)'
  );
};

const getGamesValues = (gameId, match) => {
  return `(${gameId},
  ${match.queueId},
  ${match.gameDuration},
  ${match.seasonId},
  ${match.mapId},
  "${match.gameType}",
  "${match.platformId}",
  "${match.gameVersion}",
  "${match.gameMode}",
  ${match.gameCreation})`;
};

const getMatchValues = (player, gameId, participantId, playerInfo, stats, win) => {
  return `("${player.accountId}",
  "${player.summonerName}",
  ${gameId},
  ${participantId},
  ${playerInfo.championId},
  ${playerInfo.teamId},
  ${playerInfo.spell1Id},
  ${playerInfo.spell2Id},
  ${win},
  ${stats.kills},
  ${stats.deaths},
  ${stats.assists},
  ${stats.visionScore},
  ${stats.firstBloodAssist},
  ${stats.firstBloodKill},
  ${stats.goldEarned},
  ${stats.totalDamageDealtToChampions},
  ${stats.totalMinionsKilled},
  ${stats.neutralMinionsKilled},
  ${stats.neutralMinionsKilledTeamJungle},
  ${stats.neutralMinionsKilledEnemyJungle},
  ${stats.wardsPlaced},
  ${stats.visionWardsBoughtInGame},
  ${stats.item0},
  ${stats.item1}, 
  ${stats.item2},
  ${stats.item3},
  ${stats.item4},
  ${stats.item5},
  ${stats.item6},
  ${stats.perk0},
  ${stats.perk1},
  ${stats.perk2},
  ${stats.perk3},
  ${stats.perk4},
  ${stats.perk5},
  ${stats.perkPrimaryStyle},
  ${stats.perkSubStyle},
  ${stats.statPerk0},
  ${stats.statPerk1},
  ${stats.statPerk2})`;
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

module.exports = {
  getGames,
  updateGamesAndMatches
};
