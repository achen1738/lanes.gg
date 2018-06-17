<?php
// create a new cURL resource
$ch = curl_init();

$userName = $_GET["userName"];
$registrationKey = "RGAPI-4d88b5f2-05e6-43b2-afbb-2acc4b0ad595";

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/RiotSchmick?api_key=RGAPI-4d88b5f2-05e6-43b2-afbb-2acc4b0ad595");
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);

echo $userName; // prints username


// grab URL and pass it to the browser
$result = curl_exec($ch);

echo $result; // prints the entire json object

$jsonObj = json_decode($result);
$accID = $jsonObj->{'accountId'}; // 12345

print $accID; // prints the value associated with accountId

$matchList = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/$accID";
// close cURL resource, and free up system resources
curl_close($ch);
?>