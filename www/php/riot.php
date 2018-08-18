<?php
include('php-riot-api.php');
include('FileSystemCache.php');


// Pepperminht's accID = 216014260 summonerID = 53382097
// 100T Levi's accID = 247997681
$db_user = 'root';
$db_password = 'zero124041four';
$db_name = '';
$db_host = 'localhost';

const API_URL_MATCH_3 = 'https://na1.api.riotgames.com/lol/match/v3/';
const API_KEY = 'RGAPI-15dde2cd-dd76-46b8-aab0-d7f58acae008';
// Create connection
// $conn = new mysqli($db_host, $db_user, $db_password);

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 

// echo "Connected successfully";

$queueTypes = array(0 => 'Custom games',72 => '1v1 Snowdown Showdown', 73 => '2v2 Snowdown Showdown', 
75 => '6v6 Hexakill', 76 => 'Ultra Rapid Fire', 78 => 'One For All: Mirror Mode', 
83 => 'Co-op vs AI Ultra Rapid Fire', 98 => '6v6 Hexakill', 100 => '5v5 ARAM', 
310 => 'Nemesis', 313 => 'Black Market Brawlers', 317 => 'Definitely Not Dominion', 
325 => 'All Random', 400 => '5v5 Draft Pick',420 => 'Ranked Solo', 430 => '5v5 Blind Pick', 
440 => '5v5 Ranked Flex', 450 => '5v5 ARAM', 460 => '3v3 Blind Pick', 470 => '3v3 Ranked Flex', 
600 => 'Blood Hunt Assassin',610 => 'Dark Star: Singularity', 700 => 'Clash', 
800 => 'Co-op vs. AI Intermediate Bot', 810 => 'Co-op vs. AI Intro Bot', 
820 => 'Co-op vs. AI Beginner Bot', 830 => 'Co-op vs. AI Intro Bot', 840 => 'Co-op vs. AI Beginner Bot', 
850 => 'Co-op vs. AI Intermediate Bot', 900 => 'ARURF', 910 => 'Ascension', 920 => 'Legend of the Poro King', 
940 => 'Nexus Siege', 950 => 'Doom Bots Voting', '960 => Doom Bots Standard', 
980 => 'Star Guardian Invasion: Normal', 990 => 'Star Guardian Invasion: Onslaught', 
1000 => 'PROJECT: Hunters', 1010 => 'Snow ARURF', 1020 => 'One for All');

$ch = curl_init("https://ddragon.leagueoflegends.com/api/versions.json");
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);

$result = curl_exec($ch);
// echo $result;
$versionJSON = json_decode($result);
$version = $versionJSON[0];
$champURL = "https://ddragon.leagueoflegends.com/cdn/$version/data/en_US/champion.json";
// echo $champURL;
curl_setopt($ch, CURLOPT_URL, $champURL);
$result = curl_exec($ch);
// echo $result;
$champJSON = json_decode($result);
$dDragonData = array();
if (is_array($champJSON->data) || is_object($champJSON->data)) {  
    foreach ($champJSON->data as $key => $value) {
        $champArray = array();
        $champArray['image'] = $value->image;
        $champArray['name'] = $value->name;
        $champArray['id'] = $value->id;
        $dDragonData[$value->key] = $champArray;

    }
}

// echo json_encode($ddragonData, JSON_PRETTY_PRINT);
curl_close($ch);

function timeAgo($unixTimeStamp, $duration) {
    $timestamp = floor($unixTimeStamp / 1000);
    $time = time() - $timestamp - $duration; /*returns the time in seconds  between the game and the actual date*/
    $days = floor($time / 86400); /* every day have 86 400 seconds */
    if($days == 0){
        $seconds = $time % 86400;  
        $hours = floor($seconds / 3600);
        if ($hours == 0) {
            $minutes = floor(($seconds % 3600) / 60);
            return "$minutes minutes ago";
        } else if ($hours == 1) {
            return "$hours hour ago";
        } else {
            return "$hours hours ago";
        }
    } else{
        return "$days days ago";
    }
}

function daysAgo($unixTimeStamp) {
    $timestamp = floor($unixTimeStamp / 1000);
    $time = time() - $timestamp; /*returns the time in seconds  between the game and the actual date*/
    $days = floor($time / 86400); /* every day have 86 400 seconds */
    return ($days > 30);
}

function duration($seconds) {
    $minutes = floor($seconds / 60);
    $remainder = $seconds % 60;
    return array(0 => "${minutes}m ${remainder}s", 1 => $minutes);

}

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

//testing classes
//using double quotes seems to make all names work (see issue: https://github.com/kevinohashi/php-riot-api/issues/33)
$api = new riotapi('na1', new FileSystemCache('cache/'));
$inputName = isset($_GET["userName"]) ? $_GET["userName"] : "thot commander";
$userName = str_replace("+", " ", $inputName);

try {	
    $mh = curl_multi_init();
    $finalData = array();
    $matches = array();
    $accId = $api->getSummonerAccountId($userName);
    $summId = $api->getSummonerId($userName);
    $league = $api->getLeaguePosition($summId);
    $finalData["summoner"] = $league;
    $endIndex = 20;
    $params = "endIndex=$endIndex";
    $matchList = $api->getMatchList($accId, $params);
    $curl_array = array();
    if (is_array($matchList) || is_object($matchList)) {
        if (isset($matchList['matches'])) {
            for ($j = 0; $j < $endIndex; $j++) {
                $timestamp = $matchList['matches'][$j]['timestamp'];
                if (daysAgo($timestamp)) {
                    break;
                }
                $gameID = $matchList['matches'][$j]['gameId'];
                $gameURL = API_URL_MATCH_3 . 'matches/' . $gameID;
                $curl_array[$j] = curl_init($gameURL);
                curl_setopt($curl_array[$j], CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($curl_array[$j], CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl_array[$j], CURLOPT_HTTPHEADER, array(
                    'X-Riot-Token: '. API_KEY
                ));	
                curl_multi_add_handle($mh, $curl_array[$j]);
            }
        }
    }
    $running = NULL;
    do {
        curl_multi_exec($mh, $running);
    } while ($running > 0);
    for ($i = 0; $i < $endIndex; $i++) {
        $result = curl_multi_getcontent($curl_array[$i]);
        $gameJsonObj = json_decode($result);
        $bigArray = array();
        // Iterate through all the summoners and including their name and info in the array
        for ($k = 0; $k < 10; $k++) {
            $data = array();
            $data["summonerName"] = $gameJsonObj->participantIdentities[$k]->player->summonerName;
            $data["champName"] = $dDragonData[$gameJsonObj->participants[$k]->championId]['name'];
            $data["info"] = $gameJsonObj->participants[$k];
            $data["image"] = $dDragonData[$gameJsonObj->participants[$k]->championId]['image'];
            $data["id"] = $dDragonData[$gameJsonObj->participants[$k]->championId]['id'];
            array_push($bigArray, $data);
        }
        $bigArray["matchID"] = $gameJsonObj->gameId;
        $bigArray["queueId"] = $queueTypes[$gameJsonObj->queueId];
        $bigArray["time"] = timeAgo($gameJsonObj->gameCreation, $gameJsonObj->gameDuration);
        $bigArray["duration"] = duration($gameJsonObj->gameDuration)[0];
        $bigArray["minutes"] = duration($gameJsonObj->gameDuration)[1];
        array_push($matches, $bigArray);
    }
   
    for ($i = 0; $i < $endIndex; $i++) {
        curl_multi_remove_handle($mh, $curl_array[$i]);
    }
    curl_multi_close($mh);       
    $finalData["matches"] = $matches;
    echo json_encode(new ArrayValue($finalData), JSON_PRETTY_PRINT);
} catch(Exception $e) {
    // should change this to redirect to a new page
    echo "Error: " . $e->getMessage();
};
?>