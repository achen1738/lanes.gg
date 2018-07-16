<?php

$finalData = array();

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

$ch = curl_init();
$userName = isset($_GET["userName"]) ? $_GET["userName"] : "pepperminht";
$registrationKey = "api_key=RGAPI-6a65e600-a182-4ab3-ad6f-e916eb1688ad";
$firstURL = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/$userName?$registrationKey";
// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $firstURL);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
$result = curl_exec($ch);
$summonerJsonObj = json_decode($result);
// echo $result;
// Get the account ID and summoner ID
$accID = isset($summonerJsonObj->{'accountId'}) ? $summonerJsonObj->{'accountId'} : false; // 12345
$summID = isset($summonerJsonObj->{'id'}) ? $summonerJsonObj->{'id'} : false; // 12345

// https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/53382097?api_key=RGAPI-22d9972e-a8f2-4971-9917-89b230019e45
$leagueURL = "https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/$summID?$registrationKey";
curl_setopt($ch, CURLOPT_URL, $leagueURL);
$result = curl_exec($ch);
$leagueJsonObj = json_decode($result);
// echo "daddy";

// Retrieves the match list JSON object from the account ID
$bI = 0;
$eI = 100;
$hostName = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account";
$seasonFound = false;


$numMatches = 100;
//https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/216014260?beginIndex=0&endIndex=100&season=11&api_key=RGAPI-2317b435-f34d-404b-a927-61b76fc33d1d

$season;
$matches = array();
// while (true) {
//     $bIndex = "beginIndex=$bI";
//     $eIndex = "endIndex=$eI";
//     if (!$seasonFound) {
//         $matchListURL = "$hostName/$accID?$bIndex&$eIndex&$registrationKey";
//         curl_setopt($ch, CURLOPT_URL, $matchListURL);
//         $result = curl_exec($ch);
//         $matchlistJsonObj = json_decode($result);
//         if ($matchlistJsonObj->matches[count($matchlistJsonObj->matches) - 1]->season != $matchlistJsonObj->matches[0]->season) {
//             $seasonFound = true;
//             continue;    
//         };
//     } else {
//         $matchListURL = "$hostName/$accID?$bIndex&$eIndex&season=$season&$registrationKey";
//         curl_setopt($ch, CURLOPT_URL, $matchListURL);
//         $result = curl_exec($ch);
//         $matchlistJsonObj = json_decode($result);
//         if (count($matchlistJsonObj->matches) != 100) {
//             break;
//         }
//         $bI += 100;
//         $eI += 100;
//     }

//     //https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/216014260?beginIndex=0&endIndex=20&api_key=RGAPI-edcc3a08-1168-4953-87bc-82c80e331297


// }

curl_close($ch);
?>