function rankImage(rank, division) {
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
    $(img).appendTo('.soloRank > .tierMedal');
    return [img, mRank];
}


function addFlexRank(tierMedal, division, LP, flexName, winPercentage, winLossGames) {
    return `<div class=\"flexRank\">
        <div class=\"tierMedal\">${tierMedal}</div>
        <div class=\"tierInfo\">
            <div class=\"division\">${division}</div>
            <div class=\"LP\">${LP}</div> 
        </div>
        <div class=\"flexType\">
            <div class=\"flexName\">${flexName}</div>
        </div>
        <div class=\"gameResults\">
            <div class=\"winPercentage\">${winPercentage}</div>
            <div class=\"winLossGames\">${winLossGames}</div>
        </div>
    </div>`;
}

// function addWin(addInfo, addSpells, addKDA, addItems, trinket, addPlayers) {
//     return "<div class=\"matchItem\">" +
//         "<div class=\"win\">" +
//             "<div class=\"container\">" +
//                 `<div class=\"Spells\">${addSpells}</div>
//                 <div class=\"Info\">${addInfo}</div>
//                 <div class=\"Stats\">${addKDA}</div>
//                 <div class=\"Items\">${addItems}${trinket}</div>
//                 <div class=\"Players\">${addPlayers}</div>
//                 <div class=\"ExpandInfo\"></div>` +
//             "</div>" +
//         "</div>" +
//     "</div>";
// }


/**
 * Returns the HTML for the KDA section of a match.
 * @param {*} stats - stats is the value of 'stats' in the match json. 
 * @param {*} minutes - minutes is the duration of the game in minutes
 */
function KDA(stats, minutes) {
    // var ratio = Math.round((stats.kills + stats.assists) / stats.deaths * 100) / 100
    var ratio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
    var creeps = stats.totalMinionsKilled;
    var camps = stats.neutralMinionsKilled;
    var cs = creeps + camps;
    var cspm = (cs / minutes).toFixed(1);
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
function addItems(stats) {
    var trinket = document.createElement('div');
    var divItemsList = document.createElement('div');
    $(trinket).addClass("Trinket");
    $(divItemsList).addClass('ItemsList');

    // Iterate through all the items, if any of them equal 3637 (no item) then 
    // assign it the empty item value.
    for (var i = 0; i < 7; i++) {
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
        img.src = `http://ddragon.leagueoflegends.com/cdn/8.13.1/img/item/${number}.png`;
        // For the trinket item append it to a different div.
        if (i == 6) {
            $(img).appendTo(divItem);
            $(divItem).appendTo(trinket);
        } else {
            $(img).appendTo(divItem);
            $(divItem).appendTo(divItemsList);
        }
    }
    return [divItemsList, trinket];
}

function summSpells(result, result2, summoner) {
  
    var runeHostname = `https://ddragon.leagueoflegends.com/cdn/img/`;
    var spellHostname = `http://ddragon.leagueoflegends.com/cdn/8.13.1/img/spell/`;
    var image = summoner.image.full;
    var champURL = `http://ddragon.leagueoflegends.com/cdn/8.13.1/img/champion/${image}`;
    var info = summoner.info;
    var main = info.stats.perkPrimaryStyle;
    var rune = info.stats.perk0;
    var secondary = info.stats.perkSubStyle; 
    var spell1 = info.spell1Id;
    var spell2 = info.spell2Id;
    // Go through all the summoner spells in the summoners json, if any of their 
    // keys match the users then initialize either spell1URL or spell2URL to url of 
    // ddragon's img link
    for (var key in result2.data) {
        var insideSpell = result2.data[key];
        if (insideSpell.key == spell1) {
            var spell1URL = spellHostname + insideSpell.image.full;
        } else if (insideSpell.key == spell2) {
            var spell2URL = spellHostname + insideSpell.image.full;
        }
    }

    // Do the same thing the runes, but go through the runes json
    for (var idx in result) {
        if (result[idx].id == main) {
            var tree = result[idx];
            for (var idx2 in tree.slots[0].runes) {
                var keystone = tree.slots[0].runes[idx2];
                if (keystone.id == rune) {
                    var keystoneURL = runeHostname + keystone.icon;
                }
            }
        } else if (result[idx].id == secondary) {
            var secondaryURL = runeHostname + result[idx].icon;
        }
    }
    return `<div class=\"Spells\">
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
            <div class="Secondary">
                <img src=\"${secondaryURL}\"></img>
            </div>
        </div>   
    </div>`;
}

function addInfo(queue, timeAgo, winLoss, duration) {
    return `<div class="Info">
        <div class="Queue">${queue}</div>
        <div class="TimeAgo">${timeAgo}</div>
        <div class="WinLoss">${winLoss}</div>
        <div class="Duration">${duration}</div>
    </div>`;
}

function createPlayers() {
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


