<?php
include('php-riot-api.php');
include('FileSystemCache.php');


// Pepperminht's accID =     summonerID = 53382097
// 100T Levi's accID = 247997681
$db_user = 'root';
$db_password = 'zero124041four';
$db_name = '';
$db_host = 'localhost';

const API_URL_MATCH_3 = 'https://na1.api.riotgames.com/lol/match/v3/';
const API_KEY = 'RGAPI-293a90cd-8b0e-4d78-ba5b-c008f2568bcd';
// Create connection
// $conn = new mysqli($db_host, $db_user, $db_password);

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 

// echo "Connected successfully";

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
// $userName = isset($_GET["userName"]) ? $_GET["userName"] : "pepperminht";


try {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'X-Riot-Token: '. API_KEY
    ));		
    $accId = $api->getSummonerAccountId("pepperminht");
    $summId = $api->getSummonerId("pepperminht");
    $league = $api->getLeaguePosition($summId);
    $endIndex = 6;
    $params = "endIndex=$endIndex";
    $matchList = $api->getMatchList($accId, $params);
    if (is_array($matchList) || is_object($matchList)) {
        if (isset($matchList['matches'])) {
            for ($j = 0; $j < $endIndex; $j++) {
                $gameID = $matchList['matches'][$j]['gameId'];
                echo "$gameID: ";
                $gameURL = API_URL_MATCH_3 . 'matches/' . $gameID;
                curl_setopt($ch, CURLOPT_URL, $gameURL);
                $result = curl_exec($ch);
                $gameJsonObj = json_decode($result);
                for ($k = 0; $k < 10; $k++) {
                    $data = array();
                    $name = $gameJsonObj->participantIdentities[$k]->player->summonerName;
                    if ("pepperminht" == strtolower($name)) {
                        echo "participantId: $k ";
                    }
                }

                for ($a = 0; $a < 2; $a++) {
                    for ($b = 0; $b < 5; $b++) {
                        if (203 == $gameJsonObj->teams[$a]->bans[$b]->championId) {
                            $pickturn = $gameJsonObj->teams[$a]->bans[$b]->pickTurn;
                            echo "pickTurn: $pickturn ";
                        }
                    }
                }
                echo '<br>';
            }
        }
    }
    curl_close($ch);
} catch(Exception $e) {
    // should change this to redirect to a new page
    echo "Error: " . $e->getMessage();
};
?>