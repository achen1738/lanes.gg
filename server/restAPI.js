/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
const express = require('express');
const gameRouter = require('./game/gameAPI.js');
const userRouter = require('./user/userAPI.js');
const summonerRouter = require('./summoner/summonerAPI.js');
const timelineRouter = require('./timeline/timelineAPI.js');
const matchRouter = require('./match/matchAPI.js');
const port = 3001;

const app = express();

app.use(gameRouter);
app.use(userRouter);
app.use(summonerRouter);
app.use(timelineRouter);
app.use(matchRouter);

// start the server
app.listen(port);

console.log(`Server running on port ${port}`);
