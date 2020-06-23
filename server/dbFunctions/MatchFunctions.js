const connection = require('../connectSQL.js');
const db = require('../MySQL.js');
const { matches: Matches, games: Games } = db;

const getSummonerMatches = (accountId, limit) => {
  return Matches.findAll({
    where: {
      accountId
    },
    order: [['gameId', 'DESC']],
    limit
  }).then(res => {
    const dataValues = res.map(match => match.dataValues);
    return dataValues;
  });
};

const getAllDisplayMatches = (accountId, limit) => {
  return db.sequelize
    .query(
      `select 
        m1.summonerName, m1.gameId, m1.participantId, m1.championId, m1.teamId 
      from 
        matches as m1 
      join 
        (select 
          m2.gameId 
        from 
          matches as m2 
        where 
          m2.accountId="${accountId}" 
        limit ${limit}) d 
      on 
        m1.gameId 
      in 
        (d.gameId) 
      order by 
        m1.gameId DESC`
    )
    .then(res => res[0]);
};

const getAllMatchesGame = gameId => {
  return Matches.findAll({
    where: {
      gameId
    }
  }).then(res => {
    return res.map(match => match.dataValues);
  });
};

// select m1.summonerName, m1.gameId from matches as m1 join (select m2.gameId from matches as m2 where accountId="6V5wgu_p5Ydyl39Q4XiUyGyhFzalk72QrmiSvgghpC_RRKM" limit 20) d on m1.gameId in (d.gameId) order by m1.gameId DESC ;
//select m2.* from matches as m2 join (select m.gameId from matches where summonerName="opsdad" limit 20) d on m2.gameId in d.gameId;
//select summonerName from matches m1 left outer join matches m2 on m2.gameId = m1.gameId and m2.summonerName="opsdad";

module.exports = {
  getSummonerMatches,
  getAllDisplayMatches,
  getAllMatchesGame
};

//
// { kayn summoner object
//   id: 'TMsSo8xx5sm4RVqUiUi0usbYLXAHirIeFi4lxv4RGkh7VE7Q',
//   accountId: 'e2pOVzlZo9KBdWWZyJRbFSYmFwK94nlrsS323noDoEv42VgLpQ16kbac',
//   puuid: 'o_bQZxHCe49ExWxRqR2y5khdDKdSkfu1wHpdnJp_zCrS2rdcVgqqCUbA66S9Z-5SZge9985JVmT5GQ',
//   name: 'me arthur chen',
//   profileIconId: 3478,
//   revisionDate: 1586731319000,
//   summonerLevel: 89
// }

// opsdad
// 6V5wgu_p5Ydyl39Q4XiUyGyhFzalk72QrmiSvgghpC_RRKM
