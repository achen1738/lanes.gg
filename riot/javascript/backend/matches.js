require("dotenv").load();
var express = require("express");
var app = express();
var connection = require("./newConnection");

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
  const username = req.params.userName.split("+").join(" ");
  const leagues = await connection.getLeagues(username);
  // console.log(leagues);
  res.json(leagues);
});

app.get("/matches/:userName", async function(req, res) {
  const username = req.params.userName.split("+").join(" ");
  const matches = await connection.top20(username);
  // console.log(matches);
  // console.log(matches);
  const lower = username.toLowerCase();
  var dividedMatches = {};
  var userMatches = [];
  matches.forEach(matchObj => {
    // console.log(arr);
    var arr = matchObj.matches;
    var matchID = arr[0].matchID;
    dividedMatches[matchID] = matchObj;
    userMatches.push(
      arr.find(match => {
        return match.username.toLowerCase() === lower;
      })
    );
  });
  // var subArray = [];
  // var i = 0;
  // matches.forEach(match => {
  //   if (match.name.toLowerCase() === lower) {
  //     userMatches.push(match);
  //   }
  //   subArray.push(match);
  //   if (i % 10 === 9) {
  //     dividedMatches[match.matchID] = subArray;
  //     subArray = [];
  //   }
  //   i++;
  // });
  // var reversed = userMatches.reverse();
  var final = { matches: userMatches, allMatches: dividedMatches };
  // console.log(dividedMatches);
  var json = JSON.stringify(final);
  res.send(json);
});

app.get("/matches/userOverview/:userName/:numGames", async function(req, res) {
  const username = req.params.userName.split("+").join(" ");
  const resp = await connection.getUserOverview(username, req.params.numGames);

  // const finalArray = putChampsInArrays(resp);
  res.json(resp);
});

app.get("/matches/enemyOverview/:userName/:numGames", async function(req, res) {
  const username = req.params.userName.split("+").join(" ");
  const resp = await connection.getEnemyOverview(username, req.params.numGames);
  // const finalArray = putChampsInArrays(resp);
  res.json(resp);
});

app.get("/matches/numLosses/:userName/:numGames", async function(req, res) {
  const username = req.params.userName.split("+").join(" ");
  const resp = await connection.getNumLosses(username, req.params.numGames);
  // console.log("numWins ", resp);
  res.json(resp);
});

app.get("/timeline/:matchNum", async function(req, res) {
  const resp = await connection.getTimeline(req.params.matchNum);
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
  const username = req.params.userName.split("+").join(" ");
  const resp = await connection.update(username);
  res.json(resp);
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
