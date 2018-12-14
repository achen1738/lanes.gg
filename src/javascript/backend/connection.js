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
var name = "chaumifan";

// Setting up connections to database 
var conn = new sql.ConnectionPool(dbConfig);
var req = new sql.Request(conn);
conn.connect().then(function() {
    req.query(`SELECT * FROM players p WHERE p.name = \'${name}\'`).then(function(res) {
        if (res.recordset.length == 0) {
            kayn.Summoner.by.name(name).then(summoner => {
                console.log(summoner);
                req.query(
                    `INSERT INTO players (name, accountID, summonerID) 
                    VALUES (\'${summoner.name}\', ${summoner.accountId}, ${summoner.id})`
                ).catch(error => console.error(error));
            }).catch(error => console.error(error));
        }

        req.query(`SELECT * FROM players where name = \'${name}\'`).then(function(res) {
            getSummonerInfo(res.recordset[0].summonerID, conn);
        }).catch(function(err) {
            console.error(err);
        });
    }).catch(function(err) {
        console.error(err);
        conn.close();
    })
}).catch(function(err) {
    console.error(err);
    conn.close();
});

// Pepperminht's accID = 216014260 summonerID = 53382097

// Get the summonerID and accountID

function getSummonerInfo(sumID, conn) {
    kayn.LeaguePositions.by.summonerID(sumID).then(leagues => {   
        var i, league, size = leagues.length;
        if (size != 0) {
            for (i = 0; i < size; i++) {
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
