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
  console.log(leagues);
  res.json(leagues);
});

app.get("/matches/:userName", async function(req, res) {
  const matches = await connection.top20(req.params.userNam);
  console.log(matches);
  var json = JSON.stringify(matches);
  res.send(json);
});

app.get("/matches/overview/:userName/:numGames", async function(req, res) {
  const leagues = await connection.getOverview(
    req.params.userName,
    req.params.numGames
  );
  console.log(leagues);
  res.json(leagues);
});

app.patch("/update/:userName", async function(req, res) {
  var resp = await connection.update(req.params.userName);
  res.json(resp);
  // resp.then(result => res.send(0)).catch(err => console.error(err));
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});
