
class Summoner {

    constructor(matches, leagues, username, version) {
        this.matches = matches;
        this.leagues = leagues;
        this.username = username;
        this.version = version;
        this.champURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
        this.runeURL = `https://ddragon.leagueoflegends.com/cdn/img/`;
        this.spellURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`;
    }

    /**
     * This function adds the information regarding rank, LP, number of games, and win rate to the '.soloRank' class
     */
    addRank() {
        var leagueArray = this.leagues;
        var soloFound = false;
        // Iterate through each league, and based on its queue type add it to its according class.
        for (var i = 0; i < leagueArray.length; i++) {
            var league = leagueArray[i];
            var imgAndRank = this.rankImage(league.tier, league.rank);
            var name = league.playerOrTeamName;
            if (league.queueType == "RANKED_SOLO_5x5") {
                var rank = `${imgAndRank[1]} ${league.rank} ${league.leaguePoints} LP`;
                var winLoss = `${league.wins}W ${league.losses}L`;
                var winRatio = Math.ceil(league.wins / (league.wins + league.losses) * 100) + "% Win Ratio";
                $(`<span>${rank}</span>`).appendTo('.divLP');
                $(`<span>${winLoss}</span>`).appendTo('.tierInfo > .winLossGames');
                $(`<span>${winRatio}</span>`).appendTo('.tierInfo > .winPercentage');
                $(imgAndRank[0]).appendTo('.soloRank > .tierMedal');
                soloFound = true;
            } else {        
                this.addNotSoloRank(league, imgAndRank[0], imgAndRank[1]);
            }
        }
        // If the summoner does play solo q, then add the default unranked image.
        if (!soloFound) {
            $(`<img src=\"//opgg-static.akamaized.net/images/medals/default.png\"></img>`).appendTo('.soloRank > .tierMedal');
            $(`<span>Unranked</span>`).appendTo('.divLP');
        }
    }

    /**
     * This function adds a match to the matchlist, the match contains information regarding 
     * champ played, your stats, both teams in the game, how long ago the game was, and the games duration.
     * @param {*} match - JSON for one entire match
     * @param {*} champObj - A dictionary to store information about the champ you played.
     * @param {*} loseObj - A dictionary to store information regarding the enemy champions
     * @param {*} summName - The inputted summoner name.
     * @param {*} runesJSON - JSON from ddatadragon regarding runes.
     * @param {*} spellsJSON - JSON from ddatadragon regarding summoner spells.
     */
    async addGame(match, champObj, loseObj, summName, runesJSON, spellsJSON) {
        // Create Win-Loss Div and give it the container class
        var version = this.version;
        var matchDiv = $(`*[data-match-id="${match.matchID}"]`);
        var winLossContainerDiv = document.createElement('div');
        var players = document.createElement('div');
        var button = document.createElement('div');
        var arrow = document.createElement('div');
        var detailsContainer = document.createElement('div');
        var allPlayersItems = [];
        var allPlayersRunes = [];
        $(winLossContainerDiv).addClass('container');
        $(players).addClass("Players")
        $(button).addClass("Button");
        $(arrow).addClass("Arrow");
        $(detailsContainer).addClass("detailsContainer");
        $(arrow).appendTo(button);
        var self = this;
        button.addEventListener('click', function() {
            var divMatch = $(this.closest('.matchItem'));
            var clicked = $(this).data('clicked');
            var match = divMatch.data('match');
            var images = divMatch.data('images');
            console.log(images);
            var names = [];
            for (var i = 0; i < 10; i++) {
                names.push(`\'\"match[i].summonerName\"\'`)
            }
            var promise;
            if (!clicked) {
                clicked = 1;
                promise = getDetail(names, match.matchID, self.username);
                $(divMatch).data('promise', promise);
                $(this).data('clicked', 1);
            } else {
                promise = $(divMatch).data('promise');
            }
            promise.then((data) => {
                var timelineObj = JSON.parse(data);
                console.log(timelineObj);
                var divContainer = $(this.closest('.container'));
                var divClosest = $(divMatch.find('.detailsContainer'));

                if ($(divClosest).children().length) {
                    $(divClosest).empty();
                } else {
                    var items = divMatch.data('items');
                    var runes = divMatch.data('runes');
                    var place = divMatch.data('place');
                    var colorClass, tabColor;
                    var win = $(divContainer).hasClass('Win');
                    if (win) {
                        colorClass = "blue";
                        tabColor = "Win";
                    } else {
                        colorClass = "red";
                        tabColor = "Loss";
                    }
                    var tabContainer = 
                    `<ul class="tabs ${colorClass}">
                        <li class="tabLinks ${tabColor} active"><a href=\"boxscore\">Overview</a>
                        <li class="tabLinks ${tabColor}"><a href=\"builds\">Builds</a>
                        <li class="tabLinks ${tabColor}"><a href=\"lanes\">Lanes</a>
                    </ul>`;
                    var script = `<script>$(document).ready(function() {
                        $('.tabs .tabLinks a').on('click', function(e) {
                            var currentAttrValue = $(this).attr('href');
                            // Show/Hide Tabs
                            var tabsContent = this.closest('.detailsContainer').getElementsByClassName('tabsContent')[0];
                            tabsContent.getElementsByClassName(currentAttrValue)[0]
                            $(tabsContent.getElementsByClassName(currentAttrValue)[0]).show().siblings().hide();
                            // Change/remove current tab to active
                            $(this).parent('li').addClass('active').siblings().removeClass('active');
                    
                            e.preventDefault();
                        });
                    });
                    </script>`;
                    var tabsContent = document.createElement('div');
                    var builds = document.createElement('div');
                    var lane = document.createElement('div');
                    var path = document.createElement('div');
                    var topLane = document.createElement('div');
                    var jungleLane = document.createElement('div');
                    var midLane = document.createElement('div');
                    var botLane = document.createElement('div');
                    var laneObj = {"top":topLane, "jungle":jungleLane, "mid":midLane, "bottom":botLane}

                    $(topLane).addClass('topLane pathLane').appendTo(path);
                    $(jungleLane).addClass('jungleLane pathLane').appendTo(path);
                    $(midLane).addClass('midLane pathLane').appendTo(path);
                    $(botLane).addClass('botLane pathLane').appendTo(path);
                    $(path).addClass('pathContent').appendTo(lane);
                    tabsContent.className = "tabsContent";
                    $(divClosest).append(tabsContent).prepend(tabContainer).prepend(script);
                    $(builds).addClass('tab builds').appendTo(tabsContent);
                    $(lane).addClass('tab lanes').appendTo(tabsContent);
                    addOverview(tabsContent,match,runes,items, win, place, self.champURL);
                    addBuilds(summName, builds, version, match, timelineObj);
                    addLanes(timelineObj, win, version, place, images, lane, laneObj);
                }
            }).catch((error) => {
                console.log(error);
            })
        })

        var imageObj = {};

        // Do this type of iteration such that you can create one Team div at a time.
        for (var i = 0; i < 2; i++) {
            // Create Team div
            var team = document.createElement('div');
            $(team).addClass("Team");
            var teamObj = {};
            var playerNotFound = true;
            for (var j = 0; j < 5; j++) {
                // summoner will go from 0 to 9
                var summoner = match[j + (i * 5)];
                imageObj[(j + (i * 5)) + 1] = this.champURL + summoner.image.full;
                // For each summoner create a div and append an image of their champ to the div/their name
                var divSum = document.createElement('div');
                var divIGN = document.createElement('div');
                var divImg = document.createElement('div');            
                var chmpImg = document.createElement('img');
                $(divSum).addClass("Summoner");
                $(divIGN).addClass("IGN").html(summoner.summonerName);
                $(divIGN).appendTo(divSum);
                chmpImg.src = this.champURL + summoner.image.full;
                $(chmpImg).appendTo(divImg);
                $(divImg).addClass('SummImage');
                $(divImg).prependTo(divSum);
                // Finished summoner div is added to the team div
                $(divSum).appendTo(team);
                
                var stats = summoner.info.stats;
                var win = stats.win;
                var itemsArray = this.addItems(stats);
                var spellReturn = this.summSpells(runesJSON, spellsJSON, summoner, version);
                var creeps = stats.totalMinionsKilled;
                var camps = stats.neutralMinionsKilled;
                var cs = creeps + camps;
                var score = {
                    "kills": stats.kills, "deaths": stats.deaths, 
                    "assists": stats.assists, "cs": cs,
                    "items": itemsArray[2], "runes":spellReturn[1],
                    "level": stats.champLevel, "win": false, "loss": false
                };
                allPlayersItems.push(itemsArray[2]);
                allPlayersRunes.push(spellReturn[1]);
                var vD;
                if (summName.toLowerCase() == summoner.summonerName.toLowerCase()) {
                    playerNotFound = false;
                    var kda = this.KDA(stats, match.minutes);
                    var items = itemsArray[0];
                    var trinket = itemsArray[1];
                    var spell = spellReturn[0];
                    if (!(summoner.champName.toLowerCase() in champObj)) {
                        champObj[summoner.champName.toLowerCase()] = {
                            "games": 0, "wins": 0, "losses": 0, "kills": 0, "deaths": 0, "assists": 0, "image":summoner.image.full, "gameStats": []
                        };
                    }


    
                    // Store user kills, deaths, assists, games, wins, losses on a champ into the champObj.
                    champObj[summoner.champName.toLowerCase()]["kills"] += stats.kills;
                    champObj[summoner.champName.toLowerCase()]["deaths"] += stats.deaths;
                    champObj[summoner.champName.toLowerCase()]["assists"] += stats.assists;
                    champObj[summoner.champName.toLowerCase()]["games"] += 1;

                    if (win) {
                        vD = "Victory";
                        $(winLossContainerDiv).addClass('Win');
                        champObj[summoner.champName.toLowerCase()]["wins"] += 1;
                        score['win'] = true;
                        champObj['totalWins'] += 1;
                    } else {
                        vD = "Defeat";
                        $(winLossContainerDiv).addClass('Loss');
                        champObj[summoner.champName.toLowerCase()]["losses"] += 1;
                        score['loss'] = true;
                        champObj['totalLosses'] += 1;
                    }
                    champObj[summoner.champName.toLowerCase()]['gameStats'].push(score);
                } else {
                    // Store kills, deaths, assists, wins losses, and each individual game stats for
                    // every enemy champ into the loseObj
                    if (!(summoner.champName.toLowerCase() in teamObj)) {
                        teamObj[summoner.champName.toLowerCase()] = {
                            "games": 0, "wins": 0, "losses": 0, "kills": 0, "deaths": 0, "assists": 0, "image":summoner.image.full, "gameStats": []
                        };
                    }
                    teamObj[summoner.champName.toLowerCase()]["kills"] += stats.kills;
                    teamObj[summoner.champName.toLowerCase()]["deaths"] += stats.deaths;
                    teamObj[summoner.champName.toLowerCase()]["assists"] += stats.assists;
                    teamObj[summoner.champName.toLowerCase()]["games"] += 1;
                    if (win) {
                        teamObj[summoner.champName.toLowerCase()]["wins"] += 1;
                        score['win'] = true;
                    } else {
                        teamObj[summoner.champName.toLowerCase()]["losses"] += 1;
                    }
                    teamObj[summoner.champName.toLowerCase()]["gameStats"].push(score);
                }
            }

            // Because there are two teams to prevent unnecessary iterations, if the
            // inputted user is not found on this team then add all the information in
            // the teamObj to the loseObj, since loseObj is about the enemy champs
            if (playerNotFound) {
                $(matchDiv).data('place', (i + 1) % 2);
                Object.keys(teamObj).forEach(function(key) {
                    if (teamObj.hasOwnProperty(key)) {
                        if (key in loseObj) {   
                            loseObj[key]["kills"] += teamObj[key]["kills"];
                            loseObj[key]["deaths"] += teamObj[key]["deaths"];
                            loseObj[key]["assists"] += teamObj[key]["assists"];
                            loseObj[key]["wins"] += teamObj[key]["wins"];
                            loseObj[key]["losses"] += teamObj[key]["losses"];
                            loseObj[key]["games"] += 1;
                            loseObj[key]['gameStats'].push(teamObj[key]['gameStats'][0]);
                        } else {
                            loseObj[key] = teamObj[key];
                        }
                    }
                });
            }
            // add the team div to the players div
            $(team).appendTo(players);
        }
        var info = this.addInfo(match.queueId, match.time, vD, match.duration);
        // $(addWin(info, spell, kda, items.innerHTML, trinket.innerHTML, players.innerHTML)).appendTo('.summonerMatches > .Content');
        $(spell).appendTo(winLossContainerDiv);
        $(info).appendTo(winLossContainerDiv);
        $(kda).appendTo(winLossContainerDiv);
        $(items).appendTo(winLossContainerDiv);
        $(trinket).appendTo(winLossContainerDiv);
        $(players).appendTo(winLossContainerDiv);
        $(button).appendTo(winLossContainerDiv);
        $(matchDiv).data('match', match);
        $(matchDiv).data('runes', allPlayersRunes);
        $(matchDiv).data('items', allPlayersItems);
        $(matchDiv).data('images', imageObj);
        $(winLossContainerDiv).appendTo(matchDiv);
        $(detailsContainer).appendTo(matchDiv);
    }
    
    /**
     * This function creates the matchlist, so it goes through every item in this.matches
     * and parses its data.
     */
    addMatches() {
        var self = this;
        var matchArray = this.matches;
        var name = this.username;
        var ajaxRunes = $.ajax({url: `https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/runesReforged.json`});
        var ajaxSpells = $.ajax({url: `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/summoner.json`});
        ajaxRunes.done(function(runesJSON) {
            ajaxSpells.done(function(spellsJSON) {
                var champObj = {totalWins: 0, totalLosses: 0};
                var loseObj = {};
                for (var j = 0; j < matchArray.length; j++) {
                    var match = matchArray[j];
                    var matchDiv = document.createElement('div');
                    $(matchDiv).addClass("matchItem");
                    $(matchDiv).attr('data-match-id', match.matchID);
                    $(matchDiv).appendTo('.summonerMatches > .Content > .matchList');
                    self.addGame(match, champObj, loseObj, name, runesJSON, spellsJSON);
                }
                self.addRecentStats(champObj, loseObj);
            });
        });
    }
    
    /**
     * This function uses data acquired from Riot API and translates it to an image
     * regarding the rank medal, and the rank in string form.
     * @param {*} rank - rank acquired from Riot API.
     * @param {*} division - division acquired from Riot API.
     */
    rankImage(rank, division) {
        var mRank, div, img;
        img = document.createElement('img');
        var divisions = {
            "I": 1,
            "II": 2,
            "III": 3,
            "IV": 4,
            "V": 5
        }
    
        var tiers = {
            "BRONZE": "Bronze",
            "SILVER": "Silver",
            "GOLD": "Gold",
            "PLATINUM": "Platinum",
            "DIAMOND": "Diamond",
            "MASTER": "Master",
            "CHALLENGER": "Challenger"
        }
    
        if (typeof(tiers[rank]) == 'undefined') {
            mRank = "Unranked";
            img.src = `opgg-static.akamaized.net/images/medals/default.png`
        } else {
            mRank = tiers[rank];
            if (typeof(divisions[division]) == 'undefined') {
                div = 1;
            } else {
                div = divisions[division];
            }
            img.src = `//opgg-static.akamaized.net/images/medals/${mRank.toLowerCase()}_${div}.png`
        }
        // $(img).appendTo('.soloRank > .tierMedal');
        return [img, mRank];
    }
    
    /**
     * Returns the HTML for the KDA section of a match.
     * @param {*} stats - stats is the value of 'stats' in the match json. 
     * @param {*} minutes - minutes is the duration of the game in minutes
     */
    KDA(stats, minutes) {
        // var ratio = Math.round((stats.kills + stats.assists) / stats.deaths * 100) / 100
        var ratio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
        var creeps = stats.totalMinionsKilled;
        var camps = stats.neutralMinionsKilled;
        var cs = creeps + camps;
        var cspm = (cs / minutes).toFixed(1);
        if (ratio == Infinity) {
            ratio = "Perfect"
        }
        return `<div class="Stats">
            <div class="KDA">
                <span class="Kills">${stats.kills}</span> /  
                <span class="Deaths">${stats.deaths}</span> /
                <span class="Assists">${stats.assists}</span>
            </div>
            <div class="Ratio">
                <span class="Ratio">${ratio} KDA</span>
            </div>
            <div class=CS>
                <span class=creeps>${cs} (${cspm}) CS</span>
            </div>
        </div>`
    }
    
    /**
     * Returns the Items HTML which is found in a matchItem div
     * @param {*} stats - stats is the value of 'stats' in the match json. 
     */
    addItems(stats) {
        var trinket = document.createElement('div');
        var divItemsList = document.createElement('div');
        var imgArray = []
        $(trinket).addClass("Trinket");
        $(divItemsList).addClass('ItemsList');
    
        // Iterate through all the items, if any of them equal 3637 (no item) then 
        // assign it the empty item value.
        for (var i = 0; i < 7; i++) {
            var number;
            name = `item${i}`
            if (stats[name] == 0) {
                // maybe change this so that it can stay automated, what if 3637 changes?
                number = 3637;
            } else {
                number = stats[name];
            }
            var divItem = document.createElement('div');
            $(divItem).addClass('Item');
            var img = document.createElement('img');
            img.src = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${number}.png`;
            // For the trinket item append it to a different div.
            $(img).appendTo(divItem);
            if (i == 6) {
                $(divItem).appendTo(trinket);
            } else {
                $(divItem).appendTo(divItemsList);
            }
            imgArray.push(`<img src=\"${img.src}\">`);
        }
        return [divItemsList, trinket, imgArray];
    }
    
    summSpells(runesJSON, spellsJSON, summoner) {
        var version = this.version;

        var champURL = this.champURL + summoner.image.full;
        var info = summoner.info;
        var main = info.stats.perkPrimaryStyle;
        var rune = info.stats.perk0;
        var secondary = info.stats.perkSubStyle; 
        var spell1 = info.spell1Id;
        var spell2 = info.spell2Id;
        var runeColors = {8000: "gradient-precision", 8100: "gradient-domination", 8200: "gradient-sorcery", 8300: "gradient-inspiration", 8400: "gradient-resolve"};
        // Go through all the summoner spells in the summoners json, if any of their 
        // keys match the users then initialize either spell1URL or spell2URL to url of 
        // ddragon's img link
        for (var key in spellsJSON.data) {
            var insideSpell = spellsJSON.data[key];
            if (insideSpell.key == spell1) {
                var spell1URL = this.spellURL + insideSpell.image.full;
            } else if (insideSpell.key == spell2) {
                var spell2URL = this.spellURL + insideSpell.image.full;
            }
        }
    
        // Do the same thing the runes, but go through the runes json
        for (var idx in runesJSON) {
            if (runesJSON[idx].id == main) {
                var tree = runesJSON[idx];
                for (var idx2 in tree.slots[0].runes) {
                    var keystone = tree.slots[0].runes[idx2];
                    if (keystone.id == rune) {
                        var keystoneURL = this.runeURL + keystone.icon;
                    }
                }
            } else if (runesJSON[idx].id == secondary) {
                var secondaryURL = this.runeURL + runesJSON[idx].icon;
            }
        }
        var urls = [spell1URL, spell2URL, keystoneURL, secondaryURL];
        return [`<div class=\"Spells\">
            <div class=\"ChampName\">${summoner.champName}</div>
            <div class="biggestBox">
                <div class="ChampImg">
                    <img src=\"${champURL}\"></img>
                </div>
                <div class="Spell left">
                    <img src=\"${spell1URL}\"></img>
                </div>
                <div class="Spell right">
                    <img src=\"${spell2URL}\"></img>
                </div>
                <div class="MainTree">
                    <img src=\"${keystoneURL}\"></img>
                </div>
                <div class="Secondary lowerImage">
                    <img src=\"${secondaryURL}\"></img>
                </div>
                <div class="Level lowerImage">
                    ${info.stats.champLevel}
                </div>
                <svg class="svgBorder left" height="26" width="26" version="1.1" style="top:45%; z-index: 2">
                    <circle cx="13" cy="13" r="12" stroke="#ededed" stroke-width="2" fill="none"/>
                </svg>
                <svg class="svgBorder" height="26" width="26" version="1.1" style="top:45%; left:37%; z-index: 2">
                    <circle cx="13" cy="13" r="12" stroke="#ededed" stroke-width="2" fill="none"/>
                </svg>
                <svg class="svgBorder" height="30" width="30" version="1.1" style="top:60%; right:13%">
                    <circle cx="15" cy="15" r="14" stroke="url(#${runeColors[main]})" stroke-width="2" fill="none"/>
                </svg>
            </div>   
        </div>`, urls]; 
    }
    
    /**
     * Simply creates static HTML regarding the Info class found in a match.
     * @param {*} queue - A string representing queue type.
     * @param {*} timeAgo - A string representing when the game occurred.
     * @param {*} winLoss - A string representing victory or defeat.
     * @param {*} duration - The duration of the game
     */
    addInfo(queue, timeAgo, winLoss, duration) {
        return `<div class="Info">
            <div class="Queue">${queue}</div>
            <div class="TimeAgo">${timeAgo}</div>
            <div class="WinLoss">${winLoss}</div>
            <div class="Duration">${duration}</div>
        </div>`;
    }
    
    /**
     * Simply creates HTML regarding the players class found in a match.
     */
    createPlayers() {
        var players = document.createElement('div');
        $(players).addClass("Players").html(
            `<div class=\"Team\">
                <div class=\"Summoner TOP\"></div>
                <div class=\"Summoner JUNGLE\"></div>
                <div class=\"Summoner MIDDLE\"></div>
                <div class=\"Summoner DUO_CARRY\"></div>
                <div class=\"Summoner DUO_SUPPORT\"></div>
            </div>
            <div class=\"Team\">
                <div class=\"Summoner TOP\"></div>
                <div class=\"Summoner JUNGLE\"></div>
                <div class=\"Summoner MIDDLE\"></div>
                <div class=\"Summoner DUO_CARRY\"></div>
                <div class=\"Summoner DUO_SUPPORT\"></div>
            </div>`
        );
        return players;
    }
    
    /**
     * Adds information about queue types that aren't ranked solo.
     * @param {*} league - a league that is not ranked solo
     * @param {*} image - image regarding the players tier
     * @param {*} tier - the actual tier in string form.
     */
    addNotSoloRank(league, image, tier) {
        var queueInfo = document.createElement('div');
        var qType = league.queueType;
        var queueName;
        if (qType == "RANKED_FLEX_TT") {
            queueName = "Twisted Treeline"
        } else if (qType = "RANKED_FLEX_SR") {
            queueName = "Ranked Flex"
        }
    
        var winLoss = `${league.wins}W ${league.losses}L`;
        var winRatio = Math.ceil(league.wins / (league.wins + league.losses) * 100) + "% Win Ratio";
        var rank = `${tier} ${league.rank} ${league.leaguePoints} LP`;
        $(queueInfo).addClass("notSolo").html(    
            `<div class="tierMedal">
                <img src="${image.src}"></img>
            </div>
            <div class="queueType">
                <div class="queueName">${queueName}</div>
                <div class="Rank">${rank}</div>
            </div>
            <div class="winLoss">
                <div class="winPercentage">${winRatio}</div>
                <div class="winLossGame">${winLoss}</div>
            </div>`
        );
        $(queueInfo).appendTo(".summonerTier");
    }
    
    /**
     * After parsing through all the matches and modifying both the champObj and loseObj, this function
     * takes these two objects and populates the recentStats div with information regarding the 
     * players most played and most played against champs.
     * @param {*} champObj - A dictionary containing all the information of the user's recent played champions
     * @param {*} loseObj - A dictionary containing all the information regarding all of the enemy champions played.
     */
    addRecentStats(champObj, loseObj) {
        var version = this.version;
        var imageURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`
        console.log(champObj);
        console.log(loseObj);
        this.drawGraph(champObj);
        var champCopyObj = champObj;
        // <!-- <div class="totalGames">5G 4W 1L</div> -->
        var totalGames = document.createElement('div');
        var numGames = champObj['totalWins'] + champObj['totalLosses'];
        $('.totalGames').html(`${numGames}G ${champObj['totalWins']}W ${champObj['totalLosses']}L`);
    
        var totKills = this.accumulate(champObj, 'kills');
        var totDeaths = this.accumulate(champObj, 'deaths');
        var totAssists = this.accumulate(champObj, 'assists');
        var killRatio = (totKills / numGames).toFixed(1);
        var deathRatio = (totDeaths / numGames).toFixed(1);
        var assistRatio = (totAssists / numGames).toFixed(1);
        var ratio = ((totKills + totAssists) / totDeaths).toFixed(2);
        $('.averageKDA').html(`${killRatio} / ${deathRatio} / ${assistRatio} (${ratio})`);
        this.addMostPlayedChamps(champCopyObj, '.mostPlayed');
        this.addMostPlayedChamps(loseObj, '.mostPlayedAgainst');
    }
    
    /**
     * Takes the win/losses of the user and creates a graph out of it.
     * @param {*} champObj - A dictionary containing the stats of the recent games played by the user.
     */
    drawGraph(champObj) {
        // var data = []
        // if (champObj['totalLosses'] > 0)
        //     data.push(champObj['totalLosses']);
        // if (champObj['totalWins'] > 0)
        //     data.push(champObj['totalWins'] > 0);
        var config = {
            type: 'pie',
            data: {
                labels: ['Losses', 'Wins'],
                datasets: [{
                    data: [champObj['totalLosses'], champObj['totalWins']],
                    backgroundColor: [
                        '#ff6384',
                        '#36a2eb'
                    ],
                    label: 'daddy'
                }]

            },
            options: {
                responsive: false,
                legend : {
                    display: false
                },
                pieceLabel: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    mode: 'percentage',
                            
                    // font size, default is defaultFontSize
                    fontSize: 14,
        
                    fontColor: '#fff'
                },
                plugins: {
                    datalabels: {
                        display: false
                    }
                }
            }
        };
        var ctx = document.getElementById("graph").getContext("2d");
        new Chart(ctx,config);
    }
    
    /**
     * A helper function to go through the champObj or loseObj to add all of one key found in the dictionaries.
     * @param {*} champObj - A dictionary containg stats about all the champs played and played against.
     * @param {*} key - the key in the dictionary to accumulate all of its stats.
     */
    accumulate(champObj, key) {
        var sum = 0;
        var array = Object.keys(champObj);
        for (var i = 0; i < array.length; i++) {
            if (typeof champObj[array[i]] === 'object') {
                sum += champObj[array[i]][key];
            }
        }
        return sum;
    }
    
    /**
     * Given either the champ or lose object, add the 4 most played champs to its corresponding container.
     * @param {*} champObj - A dictionary containing all the information of the user's recent played champions or played against.
     * @param {*} container - the container where the HTML created should be added to.
     */
    addMostPlayedChamps(champOrLoseObj, container) {
        var version = this.version;
        var classes = ['first', 'second', 'third', 'last'];
        var imageURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`
        var word = 'games';
        for (var i = 0; i < 4; i++) {
            // Find the champion with the largest amount of games
            var champ = Object.keys(champOrLoseObj).reduce(function(prev, current) {
                var prevGames = champOrLoseObj[prev]['games'];
                var currGames = champOrLoseObj[current]['games'];
                return (prevGames > currGames) ? prev : current;
            });
            // Set their games to negative infinity, so you can find the next largest amount of games;
            champOrLoseObj[champ][word] = -Infinity;
            var cButton = document.createElement('button');
            var idName = `${container.substring(1)}Btn${i}`;
            $(cButton).attr('id', `${idName}`);
            var newJSON = {
                image: champOrLoseObj[champ]['image'],
                gameStats: champOrLoseObj[champ]['gameStats']
            }
            $(cButton).data('JSON', newJSON);

            $(cButton).click(function() {
                var location = sessionStorage.getItem('clicked');
                var id = this.id;
                if ($(`${container} .expandedContainer`)[0]) {
                    $(`${container} .expandedContainer`).remove();
                }
                if (location != this.id) {
                    var idElement = document.getElementById(`${id}`);
                    var json = $(idElement).data('JSON');
                    var wins = 0;
                    var losses = 0;
                    json['gameStats'].forEach(function(game) {
                        if (game['win']) {
                            wins += 1;
                        } else {
                            losses += 1;
                        }
                    })
                    var divExpanded = document.createElement('div');
                    var divChampList = document.createElement('div');
                    $(divExpanded).addClass('expandedContainer').addClass(classes[parseInt(id.substring(id.length - 1))]).html(`
                    <div class="champHeader">
                        <div class="champImage">
                            <img src="http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${json['image']}">
                        </div>
                        <canvas id="bar${container}" width="150px" height="40px" style="display: inline-block"></canvas>
                    </div>`);
                    $(divChampList).addClass('champList').appendTo(divExpanded);

                    var cname = id.substring(0, id.length - 4) + id.charAt(id.length - 1);
                        $(divExpanded).appendTo(`.${cname}`);
                    var ctx = document.getElementById(`bar${container}`).getContext('2d');
                    var data = {
                        label: ['Wins', 'Losses'],
                        datasets: [
                            {
                                data: [wins],
                                backgroundColor: ['#36a2eb'],
                                borderColor: ['#14a0ff'],
                                datalabels: {
                                    align: 'center',
                                    anchor: 'center',
                                    display: function() {
                                        return wins > 0;
                                    }
                                }
                            },
                            {
                                data: [losses],
                                backgroundColor: ['#ff6384'],
                                borderColor: ['#ff3d66'],
                                datalabels: {
                                    align: 'center',
                                    anchor: 'center',
                                    display: function() {
                                        return losses > 0;
                                    }
                                }
                            }
                        ],
                    };
                    new Chart(ctx, {
                        type: 'horizontalBar',
                        data: data,
                        options:{
                            responsive: false,
                            tooltips: false,
                            // hover: {mode: null},
                            legend: {
                                display: false
                            },
                            scales:{
                                xAxes: [{
                                    display: false, //this will remove all the x-axis grid lines
                                    stacked: true,
                                }],
                                yAxes: [{
                                    display: false,
                                    stacked: true
                                }]
                            },
                            plugins: {
                                datalabels: {
                                    color: 'white',
                                    font: {
                                        weight: 'bold'
                                    },
                                    formatter: Math.round
                                }
                            },
                        }
                    });

                    createChampList(divChampList, json);
                    sessionStorage.setItem('clicked', id);
                }
                if (this.id == location) {
                    sessionStorage.setItem('clicked', null);
                }
            });
            var cButtonContainer = document.createElement('div');
            var subContainer = document.createElement('div');
            var kdaDiv = document.createElement('div');
            var mostPlayedChamp = document.createElement('div');
            var cName = document.createElement('div');
            var cWins = document.createElement('div');
            var champStats = document.createElement('div');
            var img = document.createElement('img');
            var kda = ((champOrLoseObj[champ]['kills'] + champOrLoseObj[champ]['assists']) / champOrLoseObj[champ]['deaths']).toFixed(2);
            var champName = champ.charAt(0).toUpperCase() + champ.slice(1);
            var wins = champOrLoseObj[champ]['wins'];
            var losses = champOrLoseObj[champ]['losses'];
            var cImg = document.createElement('div');
            img.src = imageURL + champOrLoseObj[champ]['image'];
            $(cButton).addClass('cButton');
            $(cButtonContainer).addClass('cButtonContainer').addClass(`${container.slice(1)}${i}`);
            $(subContainer).addClass('subContainer');
            if (kda == Infinity) {
                kda = "Perfect"
                kdaDiv.style.paddingLeft = "5px";
            }
            $(kdaDiv).addClass("KDA").html(`${kda} KDA`);
            $(mostPlayedChamp).addClass("mostPlayedChamp").addClass(classes[i]);
            $(champStats).addClass("champStats");
            $(img).appendTo(cImg);
            $(cName).addClass("cName").html(`${champName}`);
            $(cName).appendTo(champStats);
            $(cWins).addClass("cWins").html(`${((wins / (wins + losses)) * 100).toFixed(0)}% (${wins}W ${losses}L)`);
            $(cWins).appendTo(champStats);
            $(cImg).addClass("cImg").appendTo(mostPlayedChamp);
            $(champStats).appendTo(mostPlayedChamp);
            $(kdaDiv).appendTo(champStats);
            $(mostPlayedChamp).appendTo(subContainer);
            $(cButton).appendTo(cButtonContainer);
            $(cButtonContainer).appendTo(subContainer);
            $(subContainer).appendTo(container);
        }
    }
}