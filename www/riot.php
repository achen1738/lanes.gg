<?php

// Pepperminht's accID = 216014260

$i = 0;
$iPrime = $i + 5;

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

$ch = curl_init();
// $userName = $_GET["userName"];
$userName = isset($_GET["userName"]) ? $_GET["userName"] : "";
// echo $userName;
$registrationKey = "api_key=RGAPI-8a63da1c-39b5-41a1-91a3-1f1b7279b9ee";
$firstURL = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/$userName?$registrationKey";
// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $firstURL);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
$result = curl_exec($ch);
$summonerJsonObj = json_decode($result);
$accID = isset($summonerJsonObj->{'accountId'}) ? $summonerJsonObj->{'accountId'} : false; // 12345

// Retrieves the match list JSON object from the account ID
$eIndex = 5;
$endIndex = "endIndex=$eIndex";

//https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/216014260?beginIndex=0&endIndex=20&api_key=RGAPI-edcc3a08-1168-4953-87bc-82c80e331297
$matchListURL = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/$accID?$endIndex&$registrationKey";
curl_setopt($ch, CURLOPT_URL, $matchListURL);
$result = curl_exec($ch);
$matchlistJsonObj = json_decode($result);
$finalData = array();
// Check if $matchlistJsonObj is an array and if it has a matches field
if (is_array($matchlistJsonObj) || is_object($matchlistJsonObj)) {
    if (isset($matchlistJsonObj->matches)) {
        // Iterate through all the matches - 5 is used as the limit because thats what I set it to.
        for ($j = 0; $j < $eIndex; $j++) {
            $gameID = $matchlistJsonObj->matches[$j]->gameId;
            $gameURL = "https://na1.api.riotgames.com/lol/match/v3/matches/$gameID?$registrationKey";

            // Retrieve the JSON object from the gameID
            curl_setopt($ch, CURLOPT_URL, $gameURL);
            $result = curl_exec($ch);
            $gameJsonObj = json_decode($result);
            $bigArray = array();

            // Iterate through all the summoners and including their name and info in the array
            for ($k = 0; $k < 10; $k++) {
                $data = array();
                $data["summonerName"] = $gameJsonObj->participantIdentities[$k]->player->summonerName;
                $data["info"] = $gameJsonObj->participants[$k];
                array_push($bigArray, $data);
            }

            // Push the array containing all the details of a match into the final array which will contain all matches
            array_push($finalData, $bigArray);
        }
    }
}
echo json_encode(new ArrayValue($finalData), JSON_PRETTY_PRINT);
// close cURL resource, and free up system resources
curl_close($ch);   
?>