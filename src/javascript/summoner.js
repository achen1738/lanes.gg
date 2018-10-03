
$(document).ready(function() {

    function reqListener () {
        console.log(this.responseText);
    }


    var url = window.location.href;
    // Index of when the word "userName" starts
    var a = url.indexOf("userName");
    // Returns the index of right after the word "userName="
    var d = a + 9;
    // Returns the word after "userName=" to the end
    var e = url.substring(d);
    // console.log(e);
    var f = e.replace(/\+/g, " ");
    // console.log(e);
    var summoner;
    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        var json = this.responseText;
        obj = JSON.parse(json);
        console.log(obj);
        var ajaxVersion = $.ajax({url: "https://ddragon.leagueoflegends.com/api/versions.json"});
        ajaxVersion.done(function(versionJSON) {
            summoner = new Summoner(obj.matches, obj.summoner, f, versionJSON[0]);
            summoner.addRank();
            summoner.addMatches();
        }); 

        // addRank(obj);
        // addMatches(obj, f);
    };
    oReq.open("get", "/src/php/riot.php?userName=" + f, true);
    oReq.send();
});