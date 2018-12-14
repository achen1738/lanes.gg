require('dotenv').load();
const { Kayn, REGIONS } = require('kayn');
const kayn = Kayn(process.env.key);

$(document).ready(function() {

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

});