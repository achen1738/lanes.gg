function getDetail(nameArray, matchID, username) {
    return new Promise(function(resolve, reject) {
        data = {names: nameArray, match: matchID, username: username}
        $.post('/www/php/details.php', data, function(response) {
            resolve(response);
        }).fail(function() {
            reject('There is an error with Riot API');
        })
    });
}

function moreGames(lastMatchID, username) {
    // console.log(lastMatchID);
    return new Promise(function(resolve, reject) {
        data = {username: username, lastMatchID: lastMatchID}
        $.post('/www/php/moreGames.php', data, function(response) {
            resolve(response);
        }).fail(function() {
            reject('There is an error with Riot API');
        })
    });
}

/**
 * Add Lanes adds the lane tab to a match item. It creates a subset of tabs that pertains to each
 * lane -- top, mid, jungle, bottom.
 * @param {*} timelineObj - timelineObj is JSON received from details.php, which contains information on
 * items bought, skills leveled, and champion kills occurred during the game
 * @param {*} win - a boolean regarding whether the inputted user won or lost the game.
 * @param {*} version - version of the game
 * @param {*} place - place is either 0 or 1, 0 represents the user is between 1-5, and 1 represents 
 * the user is between 6-10 with regards to the participantIds.
 * @param {*} images - images is an object of participantIds mapped to their respective champion image
 * @param {*} actualContainer - actualContainer is where everything is added to in the end
 * @param {*} lanes - lanes is an object mapping lane name seen in convenienceArray to divElements.
 */
async function addLanes(timelineObj, win, version, place, images, actualContainer, lanes) {
    var convenienceArray = ["top", "jungle", "mid", "bottom"];
    var ul = document.createElement('ul');
    // Iterates through each lane, and creates a kill event for each value in the lane object.
    for (var i = 0; i < 4; i++) {
        var key = convenienceArray[i];
        var lane = timelineObj.lanes[key];
        var container = lanes[key];

        var length = Object.keys(lane).length;
        var li = document.createElement('li');
        var anchor = document.createElement('a');
        var linkValue = key;
        var active = "";
        // This sets the first tab as active, so its visible;
        if (i == 0) {
            container.style.display = 'block';
            active = "buildActive";
        }
        // I just need the word bot for bottom so that the anchor can work correctly.
        if (i == 3) {
            linkValue = 'bot';
        }
        $(anchor).attr('href',`${linkValue}Lane`).html(`<svg class="icon" height="30" width="30">
        <use href="#icon-${convenienceArray[i]}"/></svg><svg class="iconCircle" height="60" width="60">
        <use href="#icon-circle"/></svg>`).appendTo(li);
        $(li).addClass(`pathTabLinks ${active}`).appendTo(ul);


        var champKills = document.createElement('champKills');
        champKills.className = 'champKills';
        var champKillContainer = document.createElement('div');
        champKillContainer.className = 'champKillContainer';
        var killsContainer = document.createElement('div');
        $(killsContainer).addClass('killsContainer').appendTo(champKillContainer)
        var currentTimestamp = lane[0].timestamp;
        for (var j = 0; j < length; j++) {
            var kill = lane[j];
            // Every kill within 45 seconds of the earliest one, I consider as an event happening together
            if (kill.timestamp > currentTimestamp + 45000) {
                var champTime = document.createElement('div');
                var mins = Math.floor(currentTimestamp / 1000 / 60);
                var seconds = Math.round(currentTimestamp / 1000 % 60);
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds;
                }
                var time = `${mins}:${seconds}`;
                $(champTime).addClass('champTime').html(time).appendTo(killsContainer);
                $(champKillContainer).appendTo(champKills);
                currentTimestamp = kill.timestamp;
                champKillContainer = document.createElement('div');
                champKillContainer.className = 'champKillContainer';
                killsContainer = document.createElement('div');
                $(killsContainer).addClass('killsContainer').appendTo(champKillContainer)
                var champNext = document.createElement('div');
                $(champNext).addClass('champNext').html('&#8250;').prependTo(champKillContainer);
            }
            var champKill = document.createElement('div');
            var aliveSide = document.createElement('div');
            var killDivider = document.createElement('div');
            var deadSide = document.createElement('div');
            var aliveImage = document.createElement('img');
            var killImage = document.createElement('img');
            var deadImage = document.createElement('img');
            var redX = document.createElement('img');
            aliveImage.src = images[kill.killerId];
            killImage.src = '/www/images/kill.png';
            deadImage.src = images[kill.victimId];
            redX.src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/240px-Red_x.svg.png";
            $(redX).addClass('redX').appendTo(deadSide);
            $(deadImage).addClass('deadImage').appendTo(deadSide);
            $(aliveSide).addClass('aliveSide').append(aliveImage).appendTo(champKill);
            $(killDivider).addClass('killDivider').append(killImage).appendTo(champKill);
            $(deadSide).addClass('deadSide').appendTo(champKill);
            var colorKill;
            // This just determines whether the victim was on your team or their team.
            if (place == 0) {
                if (kill.killerId <= 5) {
                    colorKill = 'teamKill';
                } else {
                    colorKill = 'enemyKill';
                }
            } else {
                if (kill.killerId <= 5) {
                    colorKill = 'enemyKill';
                } else {
                    colorKill = 'teamKill';
                }
            }
            $(champKill).addClass(`champKill ${colorKill}`).appendTo(killsContainer);
            // For the last value in the array just add everything to the final continer.
            if (j == length - 1) {
                var champTime = document.createElement('div');
                var mins = Math.floor(currentTimestamp / 1000 / 60);
                var seconds = Math.round(currentTimestamp / 1000 % 60);
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds;
                }
                var time = `${mins}:${seconds}`;
                $(champTime).addClass('champTime').html(time).appendTo(killsContainer);
                $(champKillContainer).appendTo(champKills);
            }
        }
        var laneColor = "";
        if (win) {
            laneColor = 'winLane';
        } else {
            laneColor = 'loseLane';
        }
        $(container).addClass(laneColor).append(champKills);
    }
    // .append(`<svg class="pathEllipse" width="400" height="85">
    // <rect x="5" y="5" rx="35" ry="92" width="350" height="68" style="fill:none;stroke: rgb(240, 229, 210);stroke-width:3"></rect></svg>
    // `)
    $(ul).addClass(`pathTabs`).prependTo(actualContainer);
    var script = `<script>
    $(document).ready(function() {
      $('.pathTabs .pathTabLinks a').on('click', function(e) {
        var currentAttrValue = $(this).attr('href');
        // Show/Hide Tabs
        var pathContent = this.closest('.lanes').getElementsByClassName('pathContent')[0];
        $(pathContent.getElementsByClassName(currentAttrValue)[0]).show().siblings().hide();
        // Change/remove current tab to active
        $(this).parent('li').addClass('buildActive').siblings().removeClass('buildActive');

        e.preventDefault();
      });
    });
    </script>`
    $(script).prependTo(actualContainer);
    $(actualContainer).addClass(laneColor);
    
}

/**
 * Creates the runes section of the builds tab. 
 * @param {*} container - container is where all the div elements are added to the end
 * @param {*} version - version of the game
 * @param {*} summoner - summoner is an actual player object found in the match obj. Contains info
 * regarding their stats, runes, champId, and participantId
 */
async function addRunes(container, version, summoner) {
    var ajaxRunes = $.ajax({url: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`});
    ajaxRunes.done(function(runesJSON) {
        var info = summoner.info;
        var stats = info.stats;
        // This object is just made to make things more convenient for whatever runetree the summoner has.
        var environmentDict = {
            8000: ["-2", "p", "#circle-gradient-precision","#gradient-precision"], 
            8100: ["", "d", "#circle-gradient-domination", "#gradient-domination"], 
            8200: ["-4", "s", "#circle-gradient-sorcery","#gradient-sorcery"], 
            8300: ["-1", "i", "#circle-gradient-inspiration", "#gradient-inspiration"],
            8400: ["-3", "r", "#circle-gradient-resolve",  "#gradient-resolve"]};
        var mainEnv = environmentDict[stats.perkPrimaryStyle];
        // Create the backdrop image of the runes section
        var runeImgURL = "https://ddragon.leagueoflegends.com/cdn/img/";
        var backdrop = document.createElement('div');
        var backdropImg = document.createElement('img');
        backdropImg.src = `https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/10/environment-constructed${mainEnv[0]}.jpg`;
        $(backdrop).addClass('backdrop').append(backdropImg).appendTo(container);
        // Create the class Rune which is just the general sorcery, resolve, dominaion ... image.
        var classRune = document.createElement('div');
        var classRuneContainer = document.createElement('div');
        var classRuneImg = document.createElement('img');
        classRuneImg.src = `https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/icon-${mainEnv[1]}-36x36.png`;
        // The following svg creates like a encapsulating circle with 3 rotated half circles around the class rune to make it look nice.
        var classRuneSvg = `<svg class="classBorder">
        <circle class="classMoon moon-bottom" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${mainEnv[2]})"></circle>
        <circle class="classMoon moon-left" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${mainEnv[2]})"></circle>
        <circle class="classMoon moon-right" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${mainEnv[2]})"></circle>
        </svg><svg class="classCircle"><circle cx="50%" cy="50%" r="48%" fill="none" stroke-width="3" stroke="url(${mainEnv[3]})"></circle></svg>`
        $(classRuneContainer).addClass('classRuneContainer').append(classRuneImg).appendTo(classRune);
        $(classRune).addClass('classRune mainTree').append(classRuneSvg).appendTo(container);
        // Creates the bigRune which is just the keystone i.e electrocute, aery, comet, fleet
        var bigRune = document.createElement('div');
        var bigRuneContainer = document.createElement('div');
        var bigRuneImg = document.createElement('img');
        
        // secondClass is the same thing as classRune but for the secondary tree.
        var secEnv = environmentDict[stats.perkSubStyle];
        var secondClass = document.createElement('div');
        var classRuneContainer = document.createElement('div');
        var secondClassImg = document.createElement('img');
        secondClassImg.src = `https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/icon-${secEnv[1]}-36x36.png`;
        var secondSvg = `<svg class="classBorder">
        <circle class="classMoon moon-bottom" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${secEnv[2]})"></circle>
        <circle class="classMoon moon-left" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${secEnv[2]})"></circle>
        <circle class="classMoon moon-right" cx="50%" cy="50%" r="43%" fill="none" stroke-width="2" stroke="url(${secEnv[2]})"></circle></svg>
        <svg class="classCircle"><circle cx="50%" cy="50%" r="48%" fill="none" stroke-width="3" stroke="url(${secEnv[3]})"></circle></svg>`;
        $(classRuneContainer).addClass('classRuneContainer').append(secondClassImg).appendTo(secondClass);
        $(secondClass).addClass('secondClass mainTree').append(secondSvg).appendTo(container);

        // Basically iterate through the runesJSON until you find an object with a key matching
        // either the main tree or secondary tree. Then iterate through this objects, slots
        // key which holds all the runes possibilities and find which rune has the same key
        // the user chose, and then create an image and add it to its respective container.
        for (var idx in runesJSON) {
            var classObj = runesJSON[idx];
            if (classObj.id == stats.perkPrimaryStyle || classObj.id == stats.perkSubStyle) {
                for (var slotIdx in classObj.slots) {
                    var runesSet = classObj.slots[slotIdx].runes;
                    for (var runesIdx in runesSet) {
                        var choice = runesSet[runesIdx]
                        if (choice.id == stats.perk0) {
                            bigRuneImg.src = runeImgURL + choice.icon;
                            $(bigRuneContainer).addClass('bigRuneContainer').append(bigRuneImg).appendTo(bigRune);
                            $(bigRune).addClass('bigRune firstRune mainTree').appendTo(container);
                        } else if (choice.id == stats.perk1 || choice.id == stats.perk2 || choice.id == stats.perk3 || 
                            choice.id == stats.perk4 || choice.id == stats.perk5) {
                                var runeLocation;
                                var borderColor;
                                if (choice.id == stats.perk1) {
                                    runeLocation = "secondRune";
                                    borderColor = mainEnv[3];
                                } else if (choice.id == stats.perk2) {
                                    runeLocation = "thirdRune";
                                    borderColor = mainEnv[3];
                                } else if (choice.id == stats.perk3) {
                                    runeLocation = "fourthRune";
                                    borderColor = mainEnv[3];
                                } else if (choice.id == stats.perk4) {
                                    runeLocation = "erRune";
                                    borderColor = secEnv[3];
                                } else {
                                    runeLocation = "sanRune"
                                    borderColor = secEnv[3];
                                }
                                var smallRune = document.createElement('div');
                                var runeContainer = document.createElement('div');
                                var smallRuneImg = document.createElement('img');
                                smallRuneImg.src = runeImgURL + choice.icon;
                                var smallRuneSvg = `<svg class="runesBorder" height="40" width="40" version="1.1">
                                <circle cx="20" cy="20" r="19" stroke="url(${borderColor})" stroke-width="2" fill="none"/></svg>`
                                $(runeContainer).addClass('runeContainer').append(smallRuneImg).appendTo(smallRune);
                                $(smallRune).addClass(`smallRune ${runeLocation} mainTree`).append(smallRuneSvg).appendTo(container);
                            }
                    }
                }
            }
        }
        // This just creates the bar connecting the horizontally aligned runes to make it look nice.
        var bars = `<div class="barThing"><div class="moreBarThing"></div></div><div class="secondBar"><div class="moreBarThing"></div></div>`;
        $(bars).appendTo(container);
    });
}

/**
 * Given the Riot values of tier and division in their league JSON object convert it to a
 * more understandable and pretty string.
 * @param {*} tier - tier value in the league json object
 * @param {*} division - division value in the league json object
 */
function formatRank(tier, division) {
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
    if (typeof tiers[tier] == 'undefined') {
        return ['Unranked'];
    } else {
        return `${tiers.tier} ${division}`;
    }
    
}

/**
 * This adds the skills section of the build tab. A table with four rows and 19 cells each is created in the end
 * @param {*} container - container is where the final table is appended to
 * @param {*} version - version is the version of the game
 * @param {*} summoner - summoner is a specific summoner of a match
 * @param {*} skillArray - skillsArray is an array of object each representing what skill was leveled.
 */
async function addBuildSkills(container, version, summoner, skillArray) {
    var champ = summoner.id;
    var ajaxChamp = $.ajax({url: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champ}.json`});
    ajaxChamp.done(function(champJSON) {
        var spellURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`;
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        $(table).append(tbody);
        var spellsArray = champJSON.data[champ].spells;
        for (var i = 0; i < 4; i++) {
            var counter = 0;
            var trow = document.createElement('tr');
            var skillName = document.createElement('td');
            var skillImg = document.createElement('img');
            var spellImg = spellsArray[i].image.full;
            skillImg.src = spellURL + spellImg;
            skillImg.className = 'skillImg';
            $(skillName).addClass('skillName').append(skillImg).appendTo(trow);
            for (var j = 0; j < 18; j++) {
                var td = document.createElement('td');
                td.className = 'number';
                if (typeof skillArray[counter] != 'undefined') {
                    if (skillArray[counter].skillSlot == i + 1) {
                        $(td).addClass('activeCell').html(j + 1);
                    }
                }
                $(td).appendTo(trow);
                counter++;
            }
            $(trow).appendTo(tbody);
        }
        $(table).appendTo(container);
    });
}


/**
 * This adds the items section of a builds section
 * @param {*} version - the current version of league (int eg. 8.15.1)
 * @param {*} summItems - summItems is an array containing all the items purchased/sold/undone by a 
 *                        single player
 */
async function addBuildItems(container, version, summItems) {
    var itemURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/`
    var currentTimestamp = summItems[0].timestamp;
    var wrappingList = document.createElement('ul');
    var outerItem = document.createElement('li');
    outerItem.className = "Item";
    var orderedList = document.createElement('ol');
    orderedList.className = "Items";
    var timeDiv = document.createElement('div');
    var mins = Math.floor(currentTimestamp / 1000 / 60);
    var seconds = Math.round(currentTimestamp / 1000 % 60);
    if (seconds.toString().length == 1) {
        seconds = "0" + seconds;
    }
    var time = `${mins}:${seconds}`;
    var tally = 1;
    var arrayLength = summItems.length;
    for (var i = 1; i < arrayLength; i++) {
        var currItem = summItems[i - 1];
        var nextItem = summItems[i];
        var innerItem = document.createElement('li');
        innerItem.className = "Item";
        // If the previous item and next item are both within in the same timeframe
        if (currItem.type === "ITEM_PURCHASED" || currItem.type === "ITEM_SOLD") {
            var image = document.createElement('img');
            image.src = `${itemURL}${currItem.itemId}.png`;
            if (currItem.type === "ITEM_SOLD") {
                image.className = 'sold';
                var redX = document.createElement('img');
                redX.src = "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/240px-Red_x.svg.png";
                $(redX).addClass('itemRedX').appendTo(innerItem);
            }
            $(image).appendTo(innerItem);

            if (currItem.timestamp < currentTimestamp + 15000 && nextItem.timestamp < currentTimestamp + 15000) {
            // Check if this item and the next item are the same
                if (currItem.itemId == nextItem.itemId) {
                    // If so increase a tally, such that we can create a special div for items w/ a tally greater than 1
                    tally += 1;
                    if (i == arrayLength - 1) {
                        var tallyDiv = document.createElement('div');
                        $(tallyDiv).addClass('tally').html(tally).appendTo(innerItem);
                        $(innerItem).appendTo(orderedList);
                        $(orderedList).appendTo(outerItem);
                        $(outerItem).appendTo(wrappingList);
                    }
                } else {
                    // The previous and next items are not the same, so if the tally is not 1, then create
                    // a div with the value of tally as its html and add it to the inner item
                    if (tally != 1) {
                        var tallyDiv = document.createElement('div');
                        $(tallyDiv).addClass('tally').html(tally).appendTo(innerItem);
                        tally = 1;
                    }
                    $(innerItem).appendTo(orderedList);
                    if (i == arrayLength - 1) {
                        var lastItem = document.createElement('li');
                        lastItem.className = "Item";
                        var lastImage = document.createElement('img');
                        lastImage.src = `${itemURL}${nextItem.itemId}.png`;
                        $(lastImage).appendTo(lastItem);
                        $(lastItem).appendTo(orderedList);
                        var timeDiv = document.createElement('div');
                        var mins = Math.floor(currentTimestamp / 1000 / 60);
                        var seconds = Math.round(currentTimestamp / 1000 % 60);
                        if (seconds.toString().length == 1) {
                            seconds = "0" + seconds;
                        }
                        var time = `${mins}:${seconds}`;
                        $(timeDiv).addClass('itemTime').html(time).appendTo(orderedList);
                        $(orderedList).appendTo(outerItem);
                        $(outerItem).appendTo(wrappingList);
                    }
                    // We always add the inner item to the ordered list -- representing the group of elements in the same timeframe
                }
            } else {
            // Since the previous item and and next item are not within the same timeframe, we want to reset
            // the orderedList variables and before that add the previous ordered list to the wrapping list.
            // Also, we have to set the currentTimestamp to the next item.
                if (tally != 1) {
                    var tallyDiv = document.createElement('div');
                    $(tallyDiv).addClass('tally').html(tally).appendTo(innerItem);
                    tally = 1;
                }
                $(innerItem).appendTo(orderedList);
                $(orderedList).appendTo(outerItem);
                $(outerItem).appendTo(wrappingList);
                var timeDiv = document.createElement('div');
                var mins = Math.floor(currentTimestamp / 1000 / 60);
                var seconds = Math.round(currentTimestamp / 1000 % 60);
                if (seconds.toString().length == 1) {
                    seconds = "0" + seconds;
                }
                var time = `${mins}:${seconds}`;
                $(timeDiv).addClass('itemTime').html(time).appendTo(orderedList);

                currentTimestamp = nextItem.timestamp;
                outerItem = document.createElement('li');
                $(outerItem).addClass('Item').html(`<div class="arrowContainer">
                                <div class="nextArrow">
                                    <i class="rightArrow"></i>
                                </div>
                            </div>`);
                orderedList = document.createElement('ol');
                orderedList.className = "Items";
                if (i == arrayLength - 1) {
                    var timeDiv = document.createElement('div');
                    var mins = Math.floor(currentTimestamp / 1000 / 60);
                    var seconds = Math.round(currentTimestamp / 1000 % 60);
                    if (seconds.toString().length == 1) {
                        seconds = "0" + seconds;
                    }
                    var time = `${mins}:${seconds}`;
                    var lastItem = document.createElement('li');
                    lastItem.className = "Item";
                    var lastImage = document.createElement('img');
                    lastImage.src = `${itemURL}${nextItem.itemId}.png`;
                    $(lastImage).appendTo(lastItem);
                    $(lastItem).appendTo(orderedList);
                    $(orderedList).appendTo(outerItem);
                    $(outerItem).appendTo(wrappingList);
                    $(timeDiv).addClass('itemTime').html(time).appendTo(orderedList);
                }
                var prevItemNumber = currItem.id;
            }
        } if (currItem.type === "ITEM_UNDO") {
            if (prevItemType === "ITEM_PURCHASED") {
                if (orderedList.childElementCount > 0) {
                    orderedList.removeChild(orderedList.lastChild);
                }
            } else if (prevItemType === "ITEM_UNDO") {
                if (prevItemNumber != currItem.beforeId) {
                    if (orderedList.childElementCount > 0) {
                        orderedList.removeChild(orderedList.lastChild);
                    }
                }
            }
            var prevItemNumber = currItem.beforeId;
        }
        var prevItemType = currItem.type;
    }
    $(wrappingList).appendTo(container);
}

/**
 * This adds the Builds div to the tabs container
 * @param {*} summName - the inputted summoner name
 * @param {*} container - div that i am adding everything to
 * @param {*} version - the game version for ddragon url
 * @param {*} match - match is the match JSON regarding a single game.
 * @param {*} timelineObj - timelineObj is the parsed timeline JSON regarding a single game.
 */
async function addBuilds(summName, container, version, match, timelineObj) {
    var header = document.createElement('ul');
    var content = document.createElement('div');
    var script = `<script>
    $(document).ready(function() {
      $('.buildTabs .buildTabLinks a').on('click', function(e) {
        var currentAttrValue = $(this).attr('href');
        // Show/Hide Tabs
        var buildsContent = this.closest('.builds').getElementsByClassName('buildsContent')[0];
        $(buildsContent.getElementsByClassName(currentAttrValue)[0]).show().siblings().hide();
        // Change/remove current tab to active
        $(this).parent('li').addClass('buildActive').siblings().removeClass('buildActive');

        e.preventDefault();
      });
    });
    </script>`
    $(script).appendTo(container);
    var convObj = {0: 'zero', 1: 'one', 2: 'two' , 3: 'three', 
    4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine'};
    var champURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
    for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        var ahref = document.createElement('a');
        var img = document.createElement('img');
        var active = "";
        if (summName.toLowerCase() == match[i].summonerName.toLowerCase()) {
            active = "buildActive";
        }
        img.src = champURL + match[i].image.full;
        $(ahref).attr('href', convObj[i]).append(img).appendTo(li);
        $(li).addClass(`buildTabLinks ${active}`).appendTo(header);
    }
    var svg = `<svg class="champSVGWrap" width="699" height="75"><rect x="5" y="5" rx="35" ry="92" width="590" height="63" 
    style="fill:none;stroke:black;stroke-width:3"/></svg>`
    $(header).append(svg).addClass('buildTabs').appendTo(container);
    $(content).addClass('buildsContent').appendTo(container);
    skills = timelineObj.skills;
    items = timelineObj.items;
    for (var i = 0; i < 10; i++) {
        var buildTab = document.createElement('div');
        var itemHeader = document.createElement('div');
        var itemsContent = document.createElement('div');
        var skillsHeader = document.createElement('div');
        var skillsContent = document.createElement('div');
        var runesContent = document.createElement('div');
        if (summName.toLowerCase() == match[i].summonerName.toLowerCase()) {
            buildTab.style.display = 'block';
        }
        $(itemHeader).addClass('sectionHeader').html('Items').appendTo(buildTab);
        $(itemsContent).addClass('itemsContent').appendTo(buildTab);
        $(skillsHeader).addClass('sectionHeader').html('Skills').appendTo(buildTab);
        $(skillsContent).addClass('skillsContent').appendTo(buildTab);
        $(runesContent).addClass('runesContent').appendTo(buildTab);
        addBuildItems(itemsContent,version, items[i + 1]);
        addBuildSkills(skillsContent, version, match[i], skills[i + 1]);
        addRunes(runesContent, version, match[i]);
        $(buildTab).addClass(`buildTab ${convObj[i]}`).appendTo(content);
    }

}

/**
 * Adds the match overview div to the game detail of a match
 * @param {*} container - container is where the html will be appended to
 * @param {*} match - match is the JSON regarding a single game.
 * @param {*} runes - array of the <img> elements of the runes in string form
 * @param {*} items - array of the <img> elements of the items in string form
 * @param {*} win - A boolean regarding whether the game was won or not.
 * @param {*} place - place is where the player is located in the array of 10 players.
 * @param {*} champURL - ddatadragon champ url without the final champ.jpg;
 * If place is 0, then he is in the first 5, else hes in the last 5.
 */
async function addOverview(container, match, runes, items, win, place, champURL) {

    var overview = document.createElement('div');
    $(overview).addClass('tab boxscore active');
    var summary = document.createElement('div');
    $(summary).addClass('summaryContainer').appendTo(overview);
    var copyPlace = place;
    var copyWin = win;
    // Iterate twice for each team.
    for (var i = 0; i < 2; i++) {
        var header = document.createElement('thead');
        var team = document.createElement('table');
        var teamContent = document.createElement('tbody');
        team.className  = 'teamDetails';
        header.className  = 'teamHeader';
        teamContent.className = 'teamContent';
        $(header).appendTo(team);
        var throw0 = document.createElement('tr');
        var winMaybe;
        if (copyWin) {
            winMaybe = "Victory";
        } else {
            winMaybe = "Defeat";
        }


        $(teamContent).appendTo(team);
        for (var j = 0; j < 5; j++) {
            // The following stuff is just creating each cell for a champion, nothing fancy
            // Just making cells for like gold, vision, damage, items, stuff like that
            // ILl comment on more complicated things
            var index = j + (copyPlace * 5);
            var summoner = match[index];
            var stats = summoner.info.stats;
            var itemArray = items[index];
            var runesArray = runes[index];
            var cLevel = `<div class="playerLevel"><div class="cLevelContainer">${stats.champLevel}</div></div>`;
            var row = document.createElement('tr');
            var name = document.createElement('td');
            var itemsDiv = document.createElement('td');
            var runesDiv = document.createElement('td');
            var champDiv = document.createElement('td');
            var statsDiv = document.createElement('td');
            var kdaDiv = document.createElement('div');
            var ratioDiv = document.createElement('div');
            var csDiv = document.createElement('td');
            var goldDiv = document.createElement('td');
            var damageDiv = document.createElement('td');
            var visionDiv = document.createElement('td');
            var wardsDiv = document.createElement('div');
            var scoreDiv = document.createElement('div');
            // Im just going through all the items and creating an image out of it
            itemArray.forEach(item => {
                var itemDiv = document.createElement('div');
                $(itemDiv).addClass('Item').html(item);
                $(itemDiv).appendTo(itemsDiv);
            })
            // Just going through all the runes and creating an image out of it
            runesArray.forEach(rune => {
                var runeDiv = document.createElement('div');
                $(runeDiv).addClass('Rune').html(`<img src=\"${rune}\">`);
                $(runeDiv).appendTo(runesDiv);
            })

            var ratio = ((stats.kills + stats.assists) / stats.deaths).toFixed(2);
            var creeps = stats.totalMinionsKilled;
            var camps = stats.neutralMinionsKilled;
            var cs = creeps + camps;
            var cspm = (cs / match.minutes).toFixed(1);
            if (ratio == Infinity) {
                ratio = "Perfect"
            } else {
                ratio += " KDA";
            }
            $(cLevel).appendTo(runesDiv);

            row.className = 'teamRow';
            champDiv.className  = 'playerChamp';
            $(champDiv).html(`<img src=\"${champURL}${summoner.image.full}\">`);
            itemsDiv.className  = 'playerItems';
            runesDiv.className = 'playerRunes';

            name.className  = 'playerName';
            var nameText = document.createTextNode(`${summoner.summonerName}`);
            name.appendChild(nameText);

            // The following are all just rowCells since they have the same outer css properties
            // I always set the classname, then create its text node, and then append this textnode to the div.
            damageDiv.className  = 'rowCell playerDmg';
            var damageText = document.createTextNode(`${stats.totalDamageDealtToChampions}`);
            damageDiv.appendChild(damageText);

            visionDiv.className  = 'rowCell playerVision';
            scoreDiv.className  = 'visionScore';
            wardsDiv.className  = 'playerWards';
            var scoreText = document.createTextNode(`${stats.visionScore}`);
            var wardsText = document.createTextNode(`${stats.sightWardsBoughtInGame} / ${stats.wardsPlaced}`);
            $(scoreDiv).append(scoreText).appendTo(visionDiv);
            $(wardsDiv).append(wardsText).appendTo(visionDiv);
            $(visionDiv).attr('data-tool-tip', `Vision Score: ${stats.visionScore}\nWards Placed: ${stats.sightWardsBoughtInGame}\nControl Wards: ${stats.wardsPlaced}` )

            statsDiv.className  = 'rowCell playerStats';
            var kdaText = document.createTextNode(`${stats.kills} / ${stats.deaths} / ${stats.assists}`);
            var ratioText = document.createTextNode(`${ratio}`);
            kdaDiv.className  = 'KDA';
            ratioDiv.className  = 'Ratio';
            $(kdaDiv).append(kdaText).appendTo(statsDiv);
            $(ratioDiv).append(ratioText).appendTo(statsDiv);

            goldDiv.className  = 'rowCell playerGold';
            var goldText = document.createTextNode(`${(stats.goldEarned / 1000).toFixed(0)}k`);
            goldDiv.appendChild(goldText);

            csDiv.className  = 'rowCell playerCS';
            var csText = document.createTextNode(`${cs} (${cspm})`);
            csDiv.appendChild(csText);


            $(champDiv).appendTo(row);
            $(runesDiv).appendTo(row);
            $(name).appendTo(row);
            $(itemsDiv).appendTo(row);
            $(statsDiv).appendTo(row);
            $(damageDiv).appendTo(row);
            $(visionDiv).appendTo(row);
            $(csDiv).appendTo(row);
            $(goldDiv).appendTo(row);
            $(row).appendTo(teamContent);

        }
        if (copyWin) {
            $(teamContent).addClass('lightBlue');
        } else {
            $(teamContent).addClass('lightRed');
        }
        $(teamContent).appendTo(team);
        if (i == 0) {
            $(team).prependTo(overview);
        } else {
            $(team).appendTo(overview);
        }
        var outcome = `<th style="text-align:  left;padding-left: 11px;">${winMaybe}</th>`;
        var rest =  `<th style="width: 25.5%;">Items</th><th style="width: 10.5%;">KDA</th>
        <th style="width: 9.75%;">Damage</th><th style="width: 9.5%;">Vision</th>
        <th style="width: 10.5%;">CS</th><th style="width: 7%;">Gold</th>`;
        $(throw0).append(outcome).append(rest).appendTo(header);
        // This is to make sure that whether place is 0 or 1, my team will always be the top one.
        // It also adjusts such that if I lost the game, my team background will be red,
        // and if I won, it will be blue.
        copyPlace = (copyPlace + 1) % 2;
        copyWin = !copyWin;
    }
    
    $(overview).appendTo(container);
}

/**
 * Creates a champ match div with the SpellsnRunes, Stats, and Items divs all filled
 * and adds it to the champList div.
 * @param {*} JSON - JSON is the JS object found in the data of the button
 */
function createChampList(container, json) {
    json['gameStats'].forEach(function(element) {
        var champMatch = document.createElement('div');
        var spellsNRunes = document.createElement('div');
        var items = document.createElement('div');
        var trinket = document.createElement('div');

        var cLevel = `<div class="cLevel"><div class="cLevelContainer">${element['level']}</div></div>`;
        var Stats = `<div class="Stats"><div class="KDA">${element['kills']} / ${element['deaths']} / ${element['assists']}</div>
            <div class="CS">${element['cs']} CS</div></div>`;
        $(champMatch).addClass('champMatch');
        $(spellsNRunes).addClass('SpellsnRunes');
        $(items).addClass('Items');
        $(trinket).addClass('Trinket')

        if (element['win']) {
            $(champMatch).addClass('Win');
        } else {
            $(champMatch).addClass('Loss');
        }

        for (var i = 0; i < 7; i++) {
            var itemImg = element['items'][i]
            var item = document.createElement('div');
            $(item).addClass('Item');
            $(itemImg).appendTo(item);
            if (i == 6) {
                $(item).appendTo(trinket);
            } else {
                $(item).appendTo(items);
            }
        }

        element['runes'].forEach(element => {
            var rune = document.createElement('div');
            var img = document.createElement('img');
            img.src = element;
            $(rune).addClass('Rune');
            $(img).appendTo(rune);
            $(rune).appendTo(spellsNRunes)
        });

        $(cLevel).appendTo(spellsNRunes);
        $(spellsNRunes).appendTo(champMatch);
        $(Stats).appendTo(champMatch);
        $(items).appendTo(champMatch);
        $(trinket).appendTo(champMatch);
        champMatch.style.paddingRight = $('.champList').offsetWidth - champMatch.clientWidth + "px";
        $(champMatch).appendTo(container);
    });
}