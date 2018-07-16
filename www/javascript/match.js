function addGame(match, summName) {
    var ajaxRunes = $.ajax({url: "https://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/runesReforged.json"});
    var ajaxSpells = $.ajax({url: "http://ddragon.leagueoflegends.com/cdn/8.13.1/data/en_US/summoner.json"});
    ajaxRunes.done(function(runesJSON) {
        ajaxSpells.done(function(spellsJSON) {
            // Create Win-Loss Div and give it the container class
            var winLossContainerDiv = document.createElement('div');
            $(winLossContainerDiv).addClass('container');
            // Create the Players div and initialize its class
            var players = document.createElement('div');
            $(players).addClass("Players")
            // Do this type of iteration such that you can create one Team div at a time.
            for (var i = 0; i < 2; i++) {
                // Create Team div
                var team = document.createElement('div');
                $(team).addClass("Team");
                for (var j = 0; j < 5; j++) {
                    // summoner will go from 0 to 9
                    var summoner = match[j + (i * 5)];
                    // For each summoner create a div and append an image of their champ to the div/their name
                    var divSum = document.createElement('div');            
                    var divIGN = document.createElement('div');  
                    var divImg = document.createElement('div');  
                    var chmpImg = document.createElement('img');
                    $(divSum).addClass("Summoner");
                    $(divIGN).addClass("IGN").html(summoner.summonerName);
                    $(divIGN).appendTo(divSum);
                    chmpImg.src = `http://ddragon.leagueoflegends.com/cdn/8.13.1/img/champion/${summoner.image.full}`;
                    $(chmpImg).appendTo(divImg);
                    $(divImg).addClass('SummImage');
                    $(divImg).prependTo(divSum);
                    // Finished summoner div is added to the team div
                    $(divSum).appendTo(team);
                    // Find the requested summoner
                    if (summName.toLowerCase() == summoner.summonerName.toLowerCase()) {
                        var stats = summoner.info.stats;
                        var win = stats.win;
                        var kda = KDA(stats, match.minutes);
                        var itemsArray = addItems(stats);
                        var items = itemsArray[0];
                        var trinket = itemsArray[1];
                        var spell = summSpells(runesJSON, spellsJSON, summoner);
                        var vD;
                        if (win) {
                            vD = "Victory";
                            $(winLossContainerDiv).addClass('Win');
                        } else {
                            vD = "Defeat";
                            $(winLossContainerDiv).addClass('Loss');
                        }
                    }
                }
                // add the team div to the players div
                $(team).appendTo(players);
            }

            var info = addInfo(match.queueId, match.time, vD, match.duration);
            // $(addWin(info, spell, kda, items.innerHTML, trinket.innerHTML, players.innerHTML)).appendTo('.summonerMatches > .Content');
            $(spell).appendTo(winLossContainerDiv);
            $(info).appendTo(winLossContainerDiv);
            $(kda).appendTo(winLossContainerDiv);
            $(items).appendTo(winLossContainerDiv);
            $(trinket).appendTo(winLossContainerDiv);
            $(players).appendTo(winLossContainerDiv);
            var matchDiv = $(`*[data-match-id="${match.matchID}"]`);
            $(winLossContainerDiv).appendTo(matchDiv);
            // console.log(winLossContainerDiv);
        });
    });
}


function addMatches(obj, e) {
    for (var j = 0; j < obj.matches.length; j++) {
        var match = obj.matches[j];
        var matchDiv = document.createElement('div');
        $(matchDiv).addClass("matchItem");
        $(matchDiv).attr('data-match-id', match.matchID);
        $(matchDiv).appendTo('.summonerMatches > .Content');
        addGame(match, e);
    }
}



