var sql = require('mssql');
require('dotenv').load();
const { Kayn, REGIONS } = require('kayn');
const kayn = Kayn(process.env.key) ();

// eplaut112's accID = n_zl9ZwvDTDijLrx6haaF5z2ZeZcLIp0i_J_UHEvUGfpyw
// me arthur chen's accID = E31Vfs6rNnnjrPF_VIaXjVZ3qC-upjQ-6Hx93yIksLcEsRKTWAg_g1hn

// Database config
var dbConfig = {
    server: "localhost\\MSSQLSERVER01",
    database: "ac99db",
    user: process.env.user,
    password: process.env.password,
    port: "8000"
}

// Init the desired name
var name = "me arthur chen";

// Setting up connections to database 
var conn = new sql.ConnectionPool(dbConfig);
var req = new sql.Request(conn);

/**
 * Easy way for me to test
 * @param {*} setting - a string, which will populate tables when it is 0, else just check results
 * @param {*} name - desired name to update tables with
 * @param {*} conn - connection to db
 */
function main(args, name, conn) {
    // If 0
    conn.connect().then(function() {
        if (args[2] === "0") {
            console.log("0");
            populateTables(name, conn);
        } else if (args[2] === "1") {
            console.log("1");
            checkResults(name,conn);
        } else if (args[2] === "2") {
            console.log("2");
            clearTables(conn);
        } else if (args[2] === "push") {
            var matchID = parseInt(args[3],10);
            pushSpecificMatchInfo(conn, matchID);
        }
    }).catch(function(err) {
        console.error(err);
        conn.close();
    });
}

/**
 * Simply just checks what are in the tables for the given name
 * @param {*} name - given name
 * @param {*} conn - connection to db
 */
function checkResults(name, conn) {
    var req = new sql.Request(conn);
    req.query(`SELECT * FROM players WHERE name = \'${name}\'`)
    .then(function(res) {
        console.log(res.recordset[0]);

        var subReq = new sql.Request(conn);
        subReq.input('sumID', sql.VarChar(150), res.recordset[0].summonerID)
        .query(`SELECT * FROM leagues WHERE summonerID = @sumID`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var secReq = new sql.Request(conn);
        secReq.input('accID', sql.VarChar(150), res.recordset[0].accountID)
        .query(`SELECT DISTINCT matchID FROM games where accountID = @accID ORDER BY matchID DESC`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var thirdReq = new sql.Request(conn);
        thirdReq.input('accID', sql.VarChar(150), res.recordset[0].accountID)
        .query(`SELECT COUNT(*) FROM games where accountID = @accID`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var fifthReq = new sql.Request(conn);
        fifthReq.input('accID', sql.VarChar(150), res.recordset[0].accountID)
        .query(`SELECT DISTINCT matchID FROM gameInfo ORDER BY matchID DESC`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var fourthReq = new sql.Request(conn);
        fourthReq.input('accID', sql.VarChar(150), res.recordset[0].accountID)
        .query(`SELECT COUNT(*) FROM gameInfo`)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

function clearTables(conn) {
    truncateTable(conn, "players");
    truncateTable(conn, "games");
    truncateTable(conn, "leagues");
    truncateTable(conn, "gameInfo");
}

/**
 * Given a matchID, makes a request to Riot's API which returns a big JSON object of data.
 * Then, for each player execute a stored procedure that stores the players stats for that game
 * in gameInfo.
 * @param {*} conn - connection to database
 * @param {*} match - matchID int.
 */
function getMatchInfo(conn, matchID) {
    var participant, player;
    return kayn.MatchV4.get(matchID)
    .then(result => {
        var i, index;
        // console.log(result);
        var size = result.participants.length;
        var half = size / 2;
        for (i = 0; i < size; i++) {
            player = result.participantIdentities[i];
            participant = result.participants[i];
            if (i < half) index = 0;
            else index = 1;
            var banNumber;
            if (result.teams[index].bans.length == 0) {
                banNumber = -1
            } else {
                banNumber = result.teams[index].bans[i % half].championId;
            }
            insertMatchInfo(conn, matchID, player, participant, banNumber, result.mapId, result.gameType, result.gameCreation);
        }
    })
    .catch(err => console.error(err))
}

/**
 * 
 * @param {*} matchList - object with a matches field that represents an array of matches
 * @param {*} conn - connection object for db
 * @param {*} accID - accountID of desired user
 * @param {*} latestGame - accountID of desired user
 */
function getMatches(matchList, conn, accID, latestGame) {
    var matches = matchList.matches;
    const promises = [];
    var i, size = matches.length;
    // Iterate through all the matches
    for (i = 0; i < 40; i++) {
        let match = matches[i];
        console.log(match.gameId);
        // If a match has the same gameID as the latest game in the database for the given account ID
        // then continue.
        if (latestGame == match.gameId) {
            console.log("Ignored iteration i: ", i, " matchID of ", match.gameId);
            continue;
        }
        var currentGame = match.gameId;
        // Push a promise that represents a single insert to games to an array
        promises.push(insertMatchID(conn, accID, match));
        promises.push(getMatchInfo(conn, currentGame));
    }
    // Return a promise of the array of promises.
    return Promise.all(promises);
}

function pushSpecificMatchInfo(conn, matchID) {
    Promise.resolve(getMatchInfo(conn, matchID)).catch(err => console.error(err));
}



/**
 * Using the given summonerID, update or populate the leagues table
 * with the summoners info.
 * @param {*} sumID 
 * @param {*} conn 
 */
function getSummonerInfo(sumID, conn) {
    // Get the players league info
    kayn.LeaguePositionsV4.by.summonerID(sumID).then(leagues => {   
        var i, league, size = leagues.length;
        // If the return result is not empty
        if (size != 0) {
            // Iterate through the array
            for (i = 0; i < size; i++) {
                // And insert/update each league into the table
                league = leagues[i];
                insertLeague(league, conn, sumID);
            }
        }
    }).catch(error => console.error(error));   
}

function truncateTable(conn, name) {
    var req = new sql.Request(conn);
    req.query(`TRUNCATE TABLE ${name}`);
}

function insertLeague(league, conn, sumID) {
    // Should probably change this to a stored procedure.
    var req = new sql.Request(conn);
    req.input('name', sql.VarChar(50), league.leagueName)
    .input('sumID', sql.VarChar(150), sumID)
    .input('qType', sql.VarChar(30), league.queueType)
    .input('tier', sql.VarChar(15), league.tier)
    .input('rank', sql.VarChar(15), league.rank)
    .input('lp', sql.Int, league.leaguePoints)
    .input('wins', sql.Int, league.wins)
    .input('losses', sql.Int, league.losses)
    .execute('insertLeague')
    .catch(error => console.error(error));
}

/**
 * Simply inserts into the games table a single entry for the given match and accountID
 * @param {*} conn - connection to db
 * @param {*} accID - accountID, bigint - will switch to string
 * @param {*} match - matchID, bigint
 */
function insertMatchID(conn, accID, match) {
    var subReq = new sql.Request(conn);
    subReq.input('role', sql.VarChar(20), match.role)
    .input('accID', sql.VarChar(150), accID)
    .input('lane', sql.VarChar(20), match.lane)
    .input('gameID', sql.BigInt, match.gameId)
    .input('season', sql.Int, match.season)
    .input('queue', sql.Int, match.queue)
    .input('champion', sql.Int, match.champion)
    .execute('insertMatchID')
    .catch(err => console.error(err));
    return subReq;
}

function insertMatchInfo(conn, gameId, player, participant, banNumber, mapId, gameType, gameCreation) {
    var req = new sql.Request(conn);
    var win;
    var stats = participant.stats;
    if (stats.win) win = 0
    else win = 1;
    req.input('matchID', sql.BigInt, gameId)
    .input('accountID', sql.VarChar(150), player.player.accountId)
    .input('name', sql.VarChar(20), player.player.summonerName)
    .input('participantID', sql.Int, player.participantId)
    .input('gameCreation', sql.BigInt, gameCreation)
    .input('gameType', sql.VarChar(50), gameType)
    .input('mapID', sql.Int, mapId)
    .input('ban', sql.Int, banNumber)
    .input('spell1ID', sql.Int, participant.spell1Id)
    .input('spell2ID', sql.Int, participant.spell2Id)
    .input('teamID', sql.Int, participant.teamId)
    .input('championID', sql.Int, participant.championId)
    .input('visionScore', sql.Int, stats.visionScore)
    .input('kills', sql.Int, stats.kills)
    .input('assists', sql.Int, stats.assists)
    .input('deaths', sql.Int, stats.deaths)
    .input('item0', sql.Int, stats.item0)
    .input('item1', sql.Int, stats.item1)
    .input('item2', sql.Int, stats.item2)
    .input('item3', sql.Int, stats.item3)
    .input('item4', sql.Int, stats.item4)
    .input('item5', sql.Int, stats.item5)
    .input('item6', sql.Int, stats.item6)
    .input('win', sql.Int, win)
    .input('wardsPlaced', sql.Int, stats.wardsPlaced)
    .input('primaryPerk', sql.Int, stats.perkPrimaryStyle)
    .input('secondaryPerk', sql.Int, stats.perkSubStyle)
    .input('champLevel', sql.Int, stats.champLevel)
    .input('visionWards', sql.Int, stats.visionWardsBoughtInGame)
    .input('keystone', sql.Int, stats.perk0)
    .input('primary0', sql.Int, stats.perk1)
    .input('primary1', sql.Int, stats.perk2)
    .input('primary2', sql.Int, stats.perk3)
    .input('secondary0', sql.Int, stats.perk4)
    .input('secondary1', sql.Int, stats.perk5)
    .input('statPerk0', sql.Int, stats.statPerk0)
    .input('statPerk1', sql.Int, stats.statPerk1)
    .input('statPerk2', sql.Int, stats.statPerk2)
    .execute('insertMatchInfo')
    .catch(err => console.error(err));
    return req;
}

/**
 * Requests the latest matchID in the games table with the given accountID,
 * then inserts all matches until you reach the latest matchID found. Finally,
 * remove all rows past the latest 100
 * @param {*} accID - accountID -- string/bigint
 * @param {*} conn - connection to db
 */
function populateMatches(accID, conn) {
    req = new sql.Request(conn);
    // Using the given found accountID, get the past 100 games.
    console.log(accID);
    kayn.MatchlistV4.by.accountID(accID).then(matchList => {
        // Pass in the accoundID as in put, and get the latest game stored game
        console.log("get inside kayn Matchv4");
        req.input('accID', sql.VarChar(150), accID)
        .query(`SELECT TOP(1) matchID FROM games WHERE accountID = @accID ORDER BY matchID DESC`)
        .then(function(result) {
            // Initially set latestGame to 0 in case table is empty for given accID
            var latestGame = 0;
            // If entries already exist, update latestGame to be the latest match id.
            if (result.recordset.length == 1) latestGame = result.recordset[0].matchID;
            // allmatches is an array of promises, that each insert a row (accID, gameID) into games
            // console.log(matchList, conn, accID, latestGame);
            console.log("can query table with accountid");
            var allMatches = getMatches(matchList, conn, accID, latestGame);
            console.log("can get array of promises");
            // Once this array finishes, then
            allMatches.then(function(res) {
                // Create a new request, and remove all the excess matches (only 100 games per accID)
                // for the given accID
                req = new sql.Request(conn);
                req.input('accID', sql.VarChar(150), accID)
                .execute('removeExcessMatches').then(function(res) {
                    console.log(res);
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));                
        }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}

function populateTables(name, conn) {
    console.log(name);
    req.query(`SELECT * FROM players WHERE name = \'${name}\'`).then(function(res) {
        // So, if the player currently doesn't exist in players, 
        if (res.recordset.length == 0) {
            // Get his account info.
            kayn.SummonerV4.by.name(name).then(summoner => {
                // Populate the players table with his summoner info
                req.input('accID', sql.VarChar(150), summoner.accountId)
                .input('summID', sql.VarChar(150), summoner.id)
                .input('name', sql.VarChar(20), summoner.name)
                .execute('insertPlayers')
                .catch(error => console.error(error));
                // At the same time insert into the leagues table.
                getSummonerInfo(summoner.id, conn);
                populateMatches(summoner.accountId, conn);
            }).catch(error => console.error(error));
        } else {
            // Since the player exists already, get their summonerID and update their data in leagues.
            getSummonerInfo(res.recordset[0].summonerID, conn);
            populateMatches(res.recordset[0].accountID, conn);
        }
    }).catch(function(err) {
        console.error(err);
        conn.close();
    })
}


main(process.argv, name, conn);