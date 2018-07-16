
$(document).ready(function() {

    function reqListener () {
        console.log(this.responseText);
    }


    var url = window.location.href;
    var a = url.indexOf("userName");
    var b = url.length;
    var c = url.substring(a,b);
    var d = a + 9;
    var e = url.substring(d,b);
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        var json = this.responseText;
        if (json == "") {
            console.log("why the fuck is json nothing");
        }
        obj = JSON.parse(json);
        console.log(obj);  
        // console.log(obj.summoner.length);
        for (var i = 0; i < obj.summoner.length; i++) {
            var league = obj.summoner[i];
            var lp = league.leaguePoints;
            var imgAndRank = rankImage(league.tier, league.rank);
            var tier = imgAndRank[1];
            var name = league.playerOrTeamName;
            if (league.queueType == "RANKED_SOLO_5x5") {
                var rank = `${tier} ${league.rank} ${lp} LP`;
                var winLoss = `${league.wins}W ${league.losses}L`;
                var winRatio = Math.ceil(league.wins / (league.wins + league.losses) * 100) + "% Win Ratio";
                $(`<span>${rank}</span>`).appendTo('.divLP');
                $(`<span>${winLoss}</span>`).appendTo('.tierInfo > .winLossGames');
                $(`<span>${winRatio}</span>`).appendTo('.tierInfo > .winPercentage');
                $(imgAndRank[0]).appendTo('.soloRank > .tierMedal');
            } else {
                
            }
        }

        addMatches(obj, e);


    };

    oReq.open("get", "riot.php?" + c, true);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to 
    //                                 continue.
    oReq.send();
});