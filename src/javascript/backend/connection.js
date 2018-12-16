var sql = require('mssql');
require('dotenv').load();
const { Kayn, REGIONS } = require('kayn');
const kayn = Kayn(process.env.key) ();




// Database config
var dbConfig = {
    server: "localhost\\MSSQLSERVER01",
    database: "ac99db",
    user: process.env.user,
    password: process.env.password,
    port: "8000"
}

// Init the desired name
var name = "eplaut112";

// Setting up connections to database 
var conn = new sql.ConnectionPool(dbConfig);
var req = new sql.Request(conn);
function populateTables(name, conn) {
    console.log(name);
    req.query(`SELECT * FROM players WHERE name = \'${name}\'`).then(function(res) {
        // So, if the player currently doesn't exist in players, 
        if (res.recordset.length == 0) {
            // Get his account info.
            kayn.Summoner.by.name(name).then(summoner => {
                // Populate the players table with his summoner info
                req.query(`INSERT INTO players (name, accountID, summonerID) 
                    VALUES (\'${summoner.name}\', ${summoner.accountId}, ${summoner.id})`
                ).catch(error => console.error(error));
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
    // console.log(matches);
    var i, size = matches.length;
    for (i = 0; i < size; i++) {
        let match = matches[i];
        if (latestGame == match.gameId) break;
        currentGame = match.gameId;
        promises.push(getMatch(conn, accID, match));
    }
    return Promise.all(promises);
}

// Pepperminht's accID = 216014260 summonerID = 53382097

// Get the summonerID and accountID

/**
 * Using the given summonerID, update or populate the leagues table
 * with the summoners info.
 * @param {*} sumID 
 * @param {*} conn 
 */
function getSummonerInfo(sumID, conn) {
    // Get the players league info
    kayn.LeaguePositions.by.summonerID(sumID).then(leagues => {   
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

function truncateTable(req, name) {
    req.query(`TRUNCATE TABLE ${name}`);
}

function insertLeague(league, conn, sumID) {
    // Should probably change this to a stored procedure.
    var req = new sql.Request(conn);
    req.input('name', sql.VarChar(50), league.leagueName)
    .input('qType', sql.VarChar(30), league.queueType)
    .input('tier', sql.VarChar(15), league.tier)
    .input('rank', sql.VarChar(15), league.rank)
    .query(`
        IF EXISTS (SELECT * FROM leagues WHERE summonerID = ${sumID} AND queueType = @qType )
        BEGIN
            SET QUOTED_IDENTIFIER OFF;

            UPDATE leagues SET leagueName = @name, wins = ${league.wins}, losses = ${league.losses}, leaguePoints = ${league.leaguePoints}, 
                tier = @tier, rank = @rank
            WHERE summonerID = ${sumID} AND queueType = @qType;

            SET QUOTED_IDENTIFIER ON;
        END
        ELSE
        BEGIN
            SET QUOTED_IDENTIFIER OFF;
            INSERT INTO leagues (summonerID, leagueName, tier, rank, queueType, leaguePoints, wins, losses)
            VALUES (${sumID}, @name, @tier, @rank, @qType, ${league.leaguePoints}, ${league.wins}, ${league.losses}); 
            SET QUOTED_IDENTIFIER ON;
        END
    `).catch(error => console.error(error));
}

function getMatch(conn, accID, match) {
    var subReq = new sql.Request(conn);
    subReq.input('role', sql.VarChar(20), match.role)
    .input('lane', sql.VarChar(20), match.lane)
    .query(`INSERT INTO games (accountID, matchID, season, role, lane, queue, champion) 
        VALUES (${accID}, ${match.gameId}, ${match.season}, @role, @lane, ${match.queue}, ${match.champion})`)
    .catch(err => console.error(err));
    return subReq;
}

function populateMatches(accID, conn) {
    req = new sql.Request(conn);
    // Using the given found accountID, get the past 100 games.
    console.log(accID);
    kayn.Matchlist.by.accountID(accID).then(matchList => {
        // Pass in the accoundID as in put, and get the latest game stored game
        req.input('accID', sql.Int, accID)
        .query(`SELECT TOP(1) matchID FROM games WHERE accountID = @accID`)
        .then(function(result) {
            // Initially set latestGame to 0 in case table is empty for given accID
            var latestGame = 0;
            // If entries already exist, update latestGame to be the latest match id.
            if (result.recordset.length == 1) latestGame = result.recordset[0].matchID;
            // allmatches is an array of promises, that each insert a row (accID, gameID) into games
            // console.log(matchList, conn, accID, latestGame);
            var allMatches = getMatches(matchList, conn, accID, latestGame);
            // Once this array finishes, then
            allMatches.then(function(res) {
                // Create a new request, and remove all the excess matches (only 100 games per accID)
                // for the given accID
                req = new sql.Request(conn);
                req.input('accID', sql.Int, accID)
                .execute('removeExcessMatches').then(function(res) {
                    console.log(res);
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));                
        }).catch(err => console.error(err));
    }).catch(err => console.error(err));
}

function main(setting, name, conn) {
    // If 0
    conn.connect().then(function() {
        if (setting === "0") {
            console.log("0");
            populateTables(name, conn);
        } else {
            console.log("1");
            checkResults(name,conn);
        }
    }).catch(function(err) {
        console.error(err);
        conn.close();
    });
}

main(process.argv[2], name, conn);

function checkResults(name, conn) {
    var req = new sql.Request(conn);
    req.query(`SELECT * FROM players WHERE name = \'${name}\'`)
    .then(function(res) {
        console.log(res.recordset[0]);
        var subReq = new sql.Request(conn);
        subReq.input('sumID', sql.Int, res.recordset[0].summonerID)
        .query(`SELECT * FROM leagues WHERE summonerID = @sumID`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var secReq = new sql.Request(conn);
        secReq.input('accID', sql.Int, res.recordset[0].accountID)
        .query(`SELECT TOP(5) * FROM games where accountID = @accID`)
        .then(res => console.log(res))
        .catch(err => console.error(err));

        var thirdReq = new sql.Request(conn);
        thirdReq.input('accID', sql.Int, res.recordset[0].accountID)
        .query(`SELECT COUNT(*) FROM games where accountID = @accID`)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}
// $(document).ready(function() {

    // var url = window.location.href;
    // // Index of when the word "userName" starts
    // var a = url.indexOf("userName");
    // // Returns the index of right after the word "userName="
    // var d = a + 9;
    // // Returns the word after "userName=" to the end
    // var e = url.substring(d);
    // // console.log(e);
    // var f = e.replace(/\+/g, " ");
    // console.log(e);

// });
