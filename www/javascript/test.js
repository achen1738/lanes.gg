// function addGame(match, summName) {
//     var oneA, oneB, oneC, oneD, oneE;
//     var twoA, twoB, twoC, twoD, twoE;
//     var teamOne = [oneA, oneB, oneC, oneD, oneE];
//     var teamTwo = [twoA, twoB, twoC, twoD, twoE];
//     var dict1 = dict2 = {
//         "TOP": 1,
//         "JUNGLE": 2,
//         "MIDDLE": 3,
//         "CARRY": 4,
//         "SUPPORT": 5
//     };
//     var a = b = team1Count = team2Count = 0;
//     var players = createPlayers();
//     var playerFound = false;

//     for (var k = 0; k < 10; k++) {

//         var summoner = match[k];

//         if (!playerFound) {
//             var vD = findPlayer(summName, summoner);
//             if (!vD) 
//                 playerFound = true;
//         }

//         var ign = document.createElement('div');
//         var role = summoner.info.timeline.lane;
//         $(ign).addClass("IGN").html(summoner.summonerName);

//         if (role == "BOTTOM")
//             role = summoner.info.timeline.role.substring(4);
//         if (summoner.info.teamId == 100) {
//             if (dict1[role] != 0) {
//                 team1Count += dict1[role];
//                 dict1[role] = 0
//                 $(ign).appendTo($(`.${role}`, players.firstChild));
//             } else {
//                 teamOne[a] = ign;
//             }
//         } else {
//             team2Count += dict2[role];
//             $(ign).appendTo($(`.${role}`, players.lastChild));
//         }
//     }
//     var info = addInfo(match.queueId, match.time, vD, match.duration);
//     $(addWin(info, "asdf ","adsf ", "asdf ", "asdf ", players.innerHTML)).appendTo('.summonerMatches > .Content');
// }



var curl = require('request');
 
// curl.setHeaders([
//     'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
// ])
// .get('https://www.google.com')
// .then(({statusCode, body, headers}) => {
//     console.log(statusCode, body, headers)
// })
// .catch((e) => {
//     console.log(e);
// });
console.log("despair");
