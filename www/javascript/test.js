// https://ddragon.leagueoflegends.com/api/versions.json

// var ajaxChampion = $.ajax({url: "https://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/champion.json"});
// ajaxChampion.done(function(champJSON) {
//     console.log(champJSON);
// });
// var ajaxVersion = $.ajax({url: "https://ddragon.leagueoflegends.com/api/versions.json"});
// ajaxVersion.done(function(versionJson) {
//     var ajaxRunes = $.ajax({url: `https://ddragon.leagueoflegends.com/cdn/${versionJson[0]}/data/en_US/runesReforged.json`});
//     var ajaxSpells = $.ajax({url: `http://ddragon.leagueoflegends.com/cdn/${versionJson[0]}/data/en_US/summoner.json`});
//     ajaxRunes.done(function(runesJSON) {
//         ajaxSpells.done(function(spellsJSON) {
//             console.log(runesJSON);
//             console.log(spellsJSON);
//         });
//     });
// });

var changeDict = {'a': 0};
var testDict = changeDict;
console.log(changeDict);
testDict['b'] = 2;
console.log(changeDict);
testDict['c'] = 4;
testDict['a'] += 1;
console.log(testDict);
// changeDict = testDict;
console.log(changeDict);