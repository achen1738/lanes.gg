require("dotenv").load();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { Kayn, REGIONS } = require("kayn");
const kayn = Kayn(process.env.key)({
  requestOptions: {
    burst: true
  }
});

const mongoURI =
  "mongodb://" +
  process.env.user +
  ":" +
  process.env.password +
  "@ds047207.mlab.com:47207/ac99db";
// console.log(mongoURI);
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

var users = new Schema({
  username: String,
  accountID: String,
  summonerID: String
});

var leagues = new Schema({
  name: String,
  summonerID: String,
  queueType: String,
  tier: String,
  rank: String,
  leaguePoints: Number,
  wins: Number,
  losses: Number
});

var games = new Schema(
  {
    role: String,
    accountID: String,
    lane: String,
    matchID: Number,
    season: Number,
    queue: Number,
    championID: Number,
    timestamp: Number
  },
  { capped: { size: 102400, max: 100 } }
);

var matchInfo = new Schema({
  matchID: Number,
  accountID: String,
  username: String,
  participantID: Number,
  gameCreation: Number,
  gameType: String,
  mapID: Number,
  ban: Number,
  spell1ID: Number,
  spell2ID: Number,
  teamID: Number,
  championID: Number,
  visionScore: Number,
  kills: Number,
  assists: Number,
  deaths: Number,
  items: [Number],
  win: Number,
  wardsPlaced: Number,
  primaryPerk: Number,
  secondaryPerk: Number,
  champLevel: Number,
  visionWards: Number,
  primaryTree: [Number],
  secondaryTree: [Number],
  ternaryTree: [Number],
  gameDuration: Number,
  timestamp: Number,
  jungleEnemy: Number,
  jungleTeam: Number,
  totalMinionsKilled: Number,
  goldEarned: Number,
  damageDone: Number
});

var timeline = new Schema({
  matchID: Number,
  JUNGLE: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  TOP: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  MIDDLE: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  BOTTOM: [
    {
      killerId: String,
      victimId: String,
      timestamp: Number,
      assistingParticipantIds: [Number],
      position: {
        x: Number,
        y: Number
      },
      type: { type: String }
    }
  ],
  data: [
    {
      CHAMPION_KILL: [
        {
          killerId: String,
          victimId: String,
          timestamp: Number,
          assistingParticipantIds: [Number],
          position: {
            x: Number,
            y: Number
          },
          type: { type: String }
        }
      ],
      WARD_PLACED: [
        {
          timestamp: Number,
          type: { type: String },
          creatorId: Number,
          wardType: String
        }
      ],
      WARD_KILL: [
        {
          timestamp: Number,
          type: { type: String },
          killerId: Number,
          wardType: String
        }
      ],
      BUILDING_KILL: [
        {
          killerId: Number,
          timestamp: Number,
          buildingType: String,
          towerType: String,
          teamID: Number,
          assistingParticipantIds: [Number],
          position: {
            x: Number,
            y: Number
          },
          type: { type: String },
          laneType: String
        }
      ],
      ELITE_MONSTER_KILL: [
        {
          killerId: Number,
          timestamp: Number,
          position: {
            x: Number,
            y: Number
          },
          monsterType: String,
          monsterSubType: String,
          type: { type: String }
        }
      ],
      ITEM_PURCHASED: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_SOLD: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_DESTROYED: [
        {
          itemId: Number,
          timestamp: Number,
          type: { type: String },
          participantId: Number
        }
      ],
      ITEM_UNDO: [
        {
          timestamp: Number,
          afterId: Number,
          type: { type: String },
          participantId: Number,
          beforeId: Number
        }
      ],
      SKILL_LEVEL_UP: [
        {
          timestamp: Number,
          skillSlot: Number,
          levelUpType: String,
          type: { type: String },
          participantId: Number
        }
      ]
    }
  ]
});

var Users = mongoose.model("Users", users);
var Leagues = mongoose.model("Leagues", leagues);
var Games = mongoose.model("Games", games);
var MatchInfo = mongoose.model("MatchInfo", matchInfo);
var Timeline = mongoose.model("Timeline", timeline);

async function update(username) {
  var res = await Users.find({
    username: { $regex: new RegExp(username, "i") }
  });
  var summonerID, accountID;
  if (res.length === 0) {
    console.log("Creating Summoner");
    const summonerInfoRequest = await kayn.SummonerV4.by.name(username);
    await Users.create({
      username: summonerInfoRequest.name,
      accountID: summonerInfoRequest.accountId,
      summonerID: summonerInfoRequest.id
    });
    summonerID = summonerInfoRequest.id;
    accountID = summonerInfoRequest.accountId;
    // console.log(createSummoner);

    console.log("Getting Summoner Info");
  } else {
    summonerID = res[0].summonerID;
    accountID = res[0].accountID;
  }

  console.log("Getting Summoner Info");
  const summonerResults = await getSummonerInfo(summonerID);
  console.log("Finished Getting Summoner Info");

  //   console.log(summonerResults);

  console.log("Starting to Update Games && MatchInfo");
  const matchResults = await populateMatches(accountID);
  console.log("Finished Updating Games && MatchInfo");
}

async function getSummonerInfo(summonerID) {
  const leagues = await kayn.LeaguePositionsV4.by.summonerID(summonerID);
  var promises = [];
  var i,
    league,
    size = leagues.length;
  console.log("Beginning to insert league info");
  if (size != 0) {
    for (i = 0; i < size; i++) {
      // && insert/update each league into the table
      league = leagues[i];
      promises.push(insertLeague(league, summonerID));
    }
  }
  return Promise.all(promises);
}

async function insertLeague(league, summonerID) {
  return Leagues.findOneAndUpdate(
    {
      summonerID: summonerID,
      queueType: league.queueType
    },
    {
      name: league.leagueName,
      tier: league.tier,
      rank: league.rank,
      leaguePoints: league.leaguePoints,
      wins: league.wins,
      losses: league.losses
    },
    { upsert: true }
  ).catch(err => console.error(err));
}

async function populateMatches(accountID) {
  console.log("Getting match list");
  console.log(accountID);
  var matchList = await kayn.MatchlistV4.by.accountID(accountID);
  console.log("Beginning to insert match info");
  return getMatches(matchList, accountID);
}

async function getMatches(matchList, accID) {
  var matches = matchList.matches;
  var promises = [];
  var i,
    size = matches.length;
  // Iterate through all the matches
  for (i = 0; i < 20; i++) {
    let match = matches[i];
    const currentGame = match.gameId;
    // Check if the database contains this match
    const res = await Games.findOne({
      accountID: accID,
      matchID: currentGame
    }).catch(error => console.error(error));
    if (res == null) {
      // If it doesnt, insert its data into the database
      promises.push(insertMatchID(accID, match));
      promises.push(getMatchInfo(currentGame, match.timestamp));
    }
  }
  // Return a promise of the array of promises.
  return Promise.all(promises);
}

async function insertMatchID(accID, match) {
  return Games.create({
    role: match.role,
    accountID: accID,
    lane: match.lane,
    matchID: match.gameId,
    season: match.season,
    queue: match.queue,
    championID: match.champion,
    timestamp: match.timestamp
  }).catch(err => console.error(err));
}

async function getMatchInfo(matchID, timestamp) {
  var match = await kayn.MatchV4.get(matchID);
  return insertAllMatchInfos(match, matchID, timestamp);
}

async function insertAllMatchInfos(result, matchID, timestamp) {
  var i, index, participant, player;
  // console.log(result);
  var size = result.participants.length;
  var half = size / 2;
  var promises = [];
  // Iterate through each participant
  for (i = 0; i < size; i++) {
    player = result.participantIdentities[i];
    participant = result.participants[i];
    // There are two teams (different arrays), so using modular math
    // Correctly look at all indexes of the teams.
    if (i < half) index = 0;
    else index = 1;
    var banNumber;
    if (result.teams[index].bans.length == 0) banNumber = -1;
    else banNumber = result.teams[index].bans[i % half].championId;
    promises.push(
      insertMatchInfo(
        matchID,
        player,
        participant,
        banNumber,
        result.mapId,
        result.gameType,
        result.gameCreation,
        result.gameDuration,
        timestamp
      )
    );
  }
  return Promise.all(promises);
}

function insertMatchInfo(
  gameId,
  player,
  participant,
  banNumber,
  mapId,
  gameType,
  gameCreation,
  gameDuration,
  timestamp
) {
  var winValue;
  var stats = participant.stats;
  if (stats.win) winValue = 0;
  else winValue = 1;
  return MatchInfo.create({
    matchID: gameId,
    accountID: player.player.accountId,
    username: player.player.summonerName,
    participantID: player.participantId,
    gameCreation: gameCreation,
    gameType: gameType,
    mapID: mapId,
    ban: banNumber,
    spell1ID: participant.spell1Id,
    spell2ID: participant.spell2Id,
    teamID: participant.teamId,
    championID: participant.championId,
    visionScore: stats.visionScore,
    kills: stats.kills,
    assists: stats.assists,
    deaths: stats.deaths,
    items: [
      stats.item0,
      stats.item1,
      stats.item2,
      stats.item3,
      stats.item4,
      stats.item5,
      stats.item6
    ],
    win: winValue,
    wardsPlaced: stats.wardsPlaced,
    primaryPerk: stats.perkPrimaryStyle,
    secondaryPerk: stats.perkSubStyle,
    champLevel: stats.champLevel,
    visionWards: stats.visionWardsBoughtInGame,
    primaryTree: [stats.perk0, stats.perk1, stats.perk2, stats.perk3],
    secondaryTree: [stats.perk4, stats.perk5],
    ternaryTree: [stats.statPerk0, stats.statPerk1, stats.statPerk2],
    gameDuration: gameDuration,
    timestamp: timestamp,
    jungleEnemy: stats.neutralMinionsKilledEnemyJungle,
    jungleTeam: stats.neutralMinionsKilledTeamJungle,
    totalMinionsKilled: stats.totalMinionsKilled,
    goldEarned: stats.goldEarned,
    damageDone: stats.totalDamageDealtToChampions
  }).catch(err => console.error(err));
}

function clearGames() {
  Games.deleteMany({})
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));

  MatchInfo.deleteMany({})
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
}

// update("rexmonstro");
module.exports = {
  top20: getTop20Matches,
  getLeagues: getLeagues,
  update: update,
  getUserOverview: getUserOverview,
  getEnemyOverview: getEnemyOverview,
  getNumLosses: getNumLosses,
  getTimeline: getTimeline
};

async function getLeagues(username) {
  const resp = await Users.aggregate([
    { $match: { username: { $regex: new RegExp(username, "i") } } },
    {
      $lookup: {
        from: "leagues",
        localField: "summonerID",
        foreignField: "summonerID",
        as: "leagues"
      }
    }
  ]);
  console.log(resp[0]);
  return resp[0].leagues;
}

async function getUserOverview(username, numGames) {
  // Get the users accountID.
  const accID = await Users.findOne({
    username: { $regex: new RegExp(username, "i") }
  });
  const num = parseInt(numGames);
  // In the last "numGames" find the users most played champions,
  // by matching, then sorting, then limiting the number of games,
  // grouping and summing by champID, then sorting again by occurence
  // of champID, and finally limiting the top 3.
  const resp = await MatchInfo.aggregate([
    { $match: { accountID: accID.accountID } },
    { $sort: { matchID: -1 } },
    { $limit: num },
    {
      $group: {
        _id: "$championID",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 3 }
  ]);

  var arr = [];
  resp.forEach(champ => {
    arr.push(champ._id);
  });

  // For the top 3 played champs, find their match Infos
  // in MatchInfo for the last "numGames".
  const mostPlayed = await MatchInfo.aggregate([
    { $match: { accountID: accID.accountID } },
    { $sort: { matchID: -1 } },
    { $limit: num },
    { $match: { championID: { $in: arr } } },
    { $sort: { championID: 1 } }
  ]);

  //   console.log(mostPlayed);
  var final = [];
  var subArr = [];
  if (mostPlayed.length != 0) {
    var currChamp = mostPlayed[0].championID;
    mostPlayed.forEach(match => {
      if (match.championID != currChamp) {
        final.push(subArr);
        subArr = [];
        currChamp = match.championID;
      }
      subArr.push(match);
    });
  }
  final.push(subArr);
  // console.log(final);
  return final;
}

async function getEnemyOverview(username, numGames) {
  // Get all 'numGames' matchIDs that the user is in
  const newNum = parseInt(numGames);

  const resp = await Users.aggregate([
    { $match: { username: { $regex: new RegExp(username, "i") } } },
    {
      $lookup: {
        from: "games",
        let: { acc_id: "$accountID" },
        pipeline: [
          { $match: { $expr: { $eq: ["$accountID", "$$acc_id"] } } },
          { $limit: newNum }
        ],
        as: "userGames"
      }
    },
    { $sort: { matchID: -1 } },
    {
      $project: {
        accountID: "$accountID",
        project: "userGames.teamID",
        matchID: "$userGames.matchID"
      }
    }
  ]);
  const accID = resp[0].accountID;
  const matchIDs = resp[0].matchID;

  // Using the match IDs && accountID,
  // get all of the matches with the same ID, but not the same teamID
  // as the original user (get all enemy matchInfos)
  const enemyMatches = await Promise.all(
    matchIDs.map(async function(matchID) {
      const usersGame = await MatchInfo.findOne({
        matchID: matchID,
        accountID: accID
      });
      var teamNum = usersGame.teamID;
      // console.log(teamNum);
      return MatchInfo.find({
        matchID: matchID,
        teamID: { $ne: teamNum }
      });
    })
  );

  // Essentially flatmap them
  var merged = [].concat.apply([], enemyMatches);
  var counts = {};
  const len = merged.length;

  // Count all the occurrences of a championID
  for (var i = 0; i < len; i++) {
    var num = merged[i];
    counts[num.championID] = counts[num.championID]
      ? counts[num.championID] + 1
      : 1;
  }
  var props = Object.keys(counts).map(function(key) {
    return { key: key, value: this[key] };
  }, counts);

  // Sort them
  props.sort(function(p1, p2) {
    return p2.value - p1.value;
  });

  // Get the top 3
  var topThree = props.slice(0, 3);

  // Then get only the matchINfos that have the same champID
  var subArr1 = [];
  var subArr2 = [];
  var subArr3 = [];
  var final = [subArr1, subArr2, subArr3];
  merged.forEach(match => {
    if (match.championID === parseInt(topThree[0].key)) subArr1.push(match);
    else if (match.championID === parseInt(topThree[1].key))
      subArr2.push(match);
    else if (match.championID === parseInt(topThree[2].key))
      subArr3.push(match);
  });
  return final;
}

async function getTop20Matches(username) {
  // Find the users last 20 match IDs
  const resp = await Users.aggregate([
    { $match: { username: { $regex: new RegExp(username, "i") } } },
    {
      $lookup: {
        from: "games",
        let: { acc_id: "$accountID" },
        pipeline: [
          { $match: { $expr: { $eq: ["$accountID", "$$acc_id"] } } },
          { $sort: { matchID: -1 } },
          { $limit: 20 }
        ],
        as: "userGames"
      }
    }
    // { $sort: { matchID: -1 } },
    // { $limit: 20 }
  ]);
  const games = resp[0].userGames;
  // console.log(resp);
  console.log(games);
  var results = [];
  // For each match, find every MatchInfo record that has the same
  // matchID, sort by teamID and participant ID.
  // Relational DB would have been so much more efficient here
  games.forEach(game => {
    results.push(
      MatchInfo.find({
        matchID: game.matchID
      }).sort({ teamID: 1, participantID: 1 })
    );
  });

  const res = await Promise.all(results);
  var counter = 0;
  var final = [];
  res.forEach(arr => {
    var obj = {};
    obj["matches"] = arr;
    obj["queue"] = games[counter++].queue;
    final.push(obj);
  });
  // console.log(games.length);
  return final;
}

async function getNumLosses(username, numGames) {
  // Find the users account ID
  const accID = await Users.findOne({
    username: { $regex: new RegExp(username, "i") }
  });
  const num = parseInt(numGames);
  // Sum the users kills, deaths, assists, and losses in the
  // last "numGames" (an input).
  const resp = await MatchInfo.aggregate([
    { $match: { accountID: accID.accountID } },
    { $sort: { matchID: -1 } },
    { $limit: num },
    {
      $group: {
        _id: "$accountID",
        kills: { $sum: "$kills" },
        deaths: { $sum: "$deaths" },
        assists: { $sum: "$assists" },
        losses: { $sum: "$win" }
      }
    }
  ]).catch(err => console.error(err));
  // console.log(resp[0]);
  return resp[0];
}

async function getTimeline(matchID) {
  var exists = await Timeline.findOne({ matchID: matchID });
  if (exists == null) {
    console.log("Creating new timeline");
    var match = await kayn.MatchV4.timeline(matchID);
    var timelineObj = createEmptyTimelineObject(matchID);
    var data = timelineObj.data;
    match.frames.forEach(frame => {
      frame.events.forEach(event => {
        const eventType = event.type;
        if (typeof event.participantId != "undefined") {
          data[event.participantId - 1][eventType].push(event);
        } else {
          if (eventType === "WARD_PLACED") {
            data[event.creatorId - 1][eventType].push(event);
          } else {
            if (event.killerId - 1 >= 0) {
              data[event.killerId - 1][eventType].push(event);
              if (eventType === "CHAMPION_KILL") {
                data[event.victimId - 1][eventType].push(event);
                if (event.timestamp < 1020000) {
                  const x = event.position.x;
                  const y = event.position.y;
                  if (y > x - 5200 && y < x + 5200)
                    timelineObj.MIDDLE.push(event);
                  if (y > x + 3200) timelineObj.TOP.push(event);
                  else if (y < x - 3200) timelineObj.BOTTOM.push(event);
                  if (y > 5600 && y < 13200 && x > 1600 && x < 9800) {
                    if (y > x + 800) timelineObj.JUNGLE.push(event);
                  } else if (y > 1600 && y < 9800 && x > 5600 && x < 13200) {
                    if (y < x - 800) timelineObj.JUNGLE.push(event);
                  }
                }
              }
            }
          }
        }
      });
    });

    // console.log(timelineObj.data[0].CHAMPION_KILL);
    const doc = new Timeline(timelineObj);
    doc.save(function(err, book) {
      if (err) return console.error(err);
      console.log("Saved to timeline collection.");
    });
    return timelineObj;
  } else {
    console.log("Returning existing timeline");
    console.log(exists.data[0].CHAMPION_KILL[0]);
    return exists;
  }
}

/* 
wardplaced - creatorId
championkill - killerId, victimId
wardkill - killerId
buildingkill- killerId if killerId === 0 then that means a minion killed it
elitemonsterkill - killerId
*/
function createEmptyTimelineObject(matchID) {
  var timelineObj = {
    matchID: matchID,
    TOP: [],
    JUNGLE: [],
    MIDDLE: [],
    BOTTOM: [],
    data: []
  };

  for (var i = 0; i < 10; i++) {
    var playerData = {
      CHAMPION_KILL: [],
      WARD_PLACED: [],
      WARD_KILL: [],
      BUILDING_KILL: [],
      ELITE_MONSTER_KILL: [],
      ITEM_PURCHASED: [],
      ITEM_SOLD: [],
      ITEM_DESTROYED: [],
      ITEM_UNDO: [],
      SKILL_LEVEL_UP: []
    };
    timelineObj.data.push(playerData);
  }
  return timelineObj;
}

// update("me arthur chen");
// getEnemyOverview("rexmonstro", 20);
// getUserOverview("rexmonstro", 20);
// getNumLosses("rexmonstro", 20);
// getTop20Matches("rexmonstro", 20);
// clearGames();
// getTimeline(2938355678);
