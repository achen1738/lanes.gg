/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const express = require('express');
const gameRouter = require('./game/gameAPI.js');
const userRouter = require('./user/userAPI.js');
const summonerRouter = require('./summoner/summonerAPI.js');
const timelineRouter = require('./timeline/timelineAPI.js');
const matchRouter = require('./match/matchAPI.js');
const port = 8000;

const app = express();
// me arthur chen
// "accountId": "e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac",
// {
// 	"platformId": "NA1",
// 	"gameId": 3373241835,
// 	"champion": 145,
// 	"queue": 420,
// 	"season": 13,
// 	"timestamp": 1586729193463,
// 	"role": "DUO_CARRY",
// 	"lane": "BOTTOM"
// }
// {
// 	"platformId": "NA1",
// 	"gameId": 3373156799,
// 	"champion": 202,
// 	"queue": 420,
// 	"season": 13,
// 	"timestamp": 1586727415119,
// 	"role": "DUO_SUPPORT",
// 	"lane": "NONE"
// }
app.use(gameRouter);
app.use(userRouter);
app.use(summonerRouter);
app.use(timelineRouter);
app.use(matchRouter);

// start the server
app.listen(port);

console.log(`Server running on port ${port}`);
