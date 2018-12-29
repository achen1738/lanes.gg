require("dotenv").load();
var express = require("express");
var app = express();
var connection = require("./connection");

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/leagues/:userName", async function(req, res) {
  const leagues = await connection.getLeagues(req.params.userName);
  // console.log(leagues);
  res.json(leagues);
});

app.get("/matches/:userName", async function(req, res) {
  const matches = await connection.top20(req.params.userName);
  // console.log(matches);
  const lower = req.params.userName.toLowerCase();
  var userMatches = [];
  var dividedMatches = {};
  var subArray = [];
  var i = 0;
  matches.forEach(match => {
    if (match.name.toLowerCase() === lower) {
      userMatches.push(match);
    }
    subArray.push(match);
    if (i % 10 === 9) {
      dividedMatches[match.matchID] = subArray;
      subArray = [];
    }
    i++;
  });

  var final = { matches: userMatches, allMatches: dividedMatches };
  var json = JSON.stringify(final);
  res.send(json);
});

app.get("/matches/userOverview/:userName/:numGames", async function(req, res) {
  const resp = await connection.getUserOverview(
    req.params.userName,
    req.params.numGames
  );

  const finalArray = putChampsInArrays(resp);
  res.json(finalArray);
});

app.get("/matches/enemyOverview/:userName/:numGames", async function(req, res) {
  const resp = await connection.getEnemyOverview(
    req.params.userName,
    req.params.numGames
  );
  const finalArray = putChampsInArrays(resp);
  res.json(finalArray);
});

app.get("/matches/numLosses/:userName/:numGames", async function(req, res) {
  const resp = await connection.getNumLosses(
    req.params.userName,
    req.params.numGames
  );
  // console.log("numWins ", resp);
  res.json(resp);
});

function putChampsInArrays(resp) {
  var finalArray = [];
  var currArray = [];
  var currChamp = -1;
  if (resp.length > 0) currChamp = resp[0].championID;
  for (var idx in resp) {
    var element = resp[idx];
    if (currChamp === element.championID) {
      currArray.push(element);
    } else {
      finalArray.push(currArray);
      currArray = [element];
      currChamp = element.championID;
    }
  }
  finalArray.push(currArray);
  return finalArray;
}

app.patch("/update/:userName", async function(req, res) {
  const resp = await connection.update(req.params.userName);
  res.json(resp);
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
