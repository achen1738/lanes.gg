
$(document).ready(function() {

    function reqListener () {
        console.log(this.responseText);
    }

    var url = window.location.href;
    var i = url.indexOf("userName");
    var j = url.length;
    var k = url.substring(i,j);

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
        for (var i = 0; i < 10; i++) {
            var name = obj[0][i].summonerName;
            $("<span>" + name + " </span>").appendTo( ".l-container" );

        }
        
    };

    oReq.open("get", "riot.php?" + k, true);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to 
    //                                 continue.
    oReq.send();

});