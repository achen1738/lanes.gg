<?php
include('php-riot-api.php');
include('FileSystemCache.php');


$divisions = array("I"=> 1,"II"=> 2,"III"=> 3,"IV"=> 4,"V" => 5);

$tiers = array("BRONZE"=> "Bronze","SILVER"=> "Silver","GOLD"=> "Gold",
    "PLATINUM"=> "Platinum","DIAMOND"=> "Diamond","MASTER"=> "Master",
    "CHALLENGER"=> "Challenger"
);


const API_KEY = 'RGAPI-293a90cd-8b0e-4d78-ba5b-c008f2568bcd';

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}
$api = new riotapi('na1', new FileSystemCache('cache/'));
$names = isset($_POST["names"]) ? $_POST["names"] : ["Vx Wdh10429","x\u00d0\u00f8Do","1938","M1Y2O3U4L5","YaThatWasABanana","chuck normis","Thot Commander","Squashie","Spychala","Love Sona 4ever"];
$matchID = isset($_POST["match"]) ? $_POST["match"] : 2839905949;
$inputName = isset($_POST["username"]) ? json_decode('"'.$_POST["username"].'"') : "thot commander";

try {
    // I can only make 20 requests in a second, yet i have to make 21. I can also only make 100 calls ever 120 seconds/
    // So even if i can reduce the calls to 19, by removing the inputted user, that means i can only expand 5 games within 120
    // seconds, which is stupid as fuck. ugh this is where mysql is super useful TOO B AD IM STUPID AS FUCK AND CANT SSET IT UP

    // $mh = curl_multi_init();
    // $curl_array = array();
    $finalArray = array();
    // $ranks = array();
    // for ($i = 0; $i < 10; $i++) {
    //     $userName = json_decode('"'.strtolower($names[$i]).'"');
    //     $name = str_replace(" ", "%20", $userName);
    //     $summURL = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/$name?api_key=" . API_KEY;
    //     // set URL and other appropriate options
    //     $curl_array[$i] = curl_init($summURL);
    //     curl_setopt($curl_array[$i], CURLOPT_SSL_VERIFYPEER, false);
    //     curl_setopt($curl_array[$i], CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($curl_array[$i], CURLOPT_HTTPHEADER, 0);
    //     curl_multi_add_handle($mh, $curl_array[$i]);
    // }

    // $running = NULL;
    // do {
    //     curl_multi_exec($mh, $running);
    // } while ($running > 0);
    // for ($i = 0; $i < count($curl_array); $i++) {
    //     $result = curl_multi_getcontent($curl_array[$i]);
    //     $summJsonObject = json_decode($result);
    //     $summID = $summJsonObject->id;
    //     // echo $result;
    //     // array_push($finalArray, $summID);
    //     $leagueURL = "https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/$summID?api_key=" . API_KEY;
    //     // echo $leagueURL;
    //     $curl_array[$i] = curl_init($leagueURL);
    //     curl_setopt($curl_array[$i], CURLOPT_SSL_VERIFYPEER, false);
    //     curl_setopt($curl_array[$i], CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($curl_array[$i], CURLOPT_HTTPHEADER, 0);
    //     curl_multi_add_handle($mh, $curl_array[$i]);
    // }
    // //[{"leagueId":"028bc330-88a7-11e8-8d1d-c81f66dbb56c","leagueName":"Soraka's Wizards","tier":"DIAMOND",
    // // "queueType":"RANKED_SOLO_5x5","rank":"IV","playerOrTeamId":"23971532","playerOrTeamName":"Vx Wdh10429",
    // // "leaguePoints":67,"wins":116,"losses":95,"veteran":true,"inactive":false,"freshBlood":false,"hotStreak":false}]
    // do {
    //     curl_multi_exec($mh, $running);
    // } while ($running > 0);
    // for ($i = 0; $i < count($curl_array); $i++) {
    //     $result = curl_multi_getcontent($curl_array[$i]);
    //     $leagueJsonObject = json_decode($result);
    //     $length = sizeof($leagueJsonObject);
    //     if ($length == 0) {
    //         $finalString = "Unranked";
    //     } else {
    //         for ($j = 0; $j < $length; $j++) {
    //             if ($leagueJsonObject[$j]->queueType === "RANKED_SOLO_5x5") {
    //                 $tier = $tiers[$leagueJsonObject[$j]->tier];
    //                 $division = $leagueJsonObject[$j]->rank;
    //                 $finalString = "$tier $division";
    //                 $ranks[$i] = $finalString;
    //             }
    //         }
    //         if (!$finalString) {
    //             $ranks[$i] = $finalString;
    //         }
    //     }
    // }
    // for ($i = 0; $i < count($curl_array); $i++) {
    //     curl_multi_remove_handle($mh, $curl_array[$i]);
    // }
    // curl_multi_close($mh);  
    // $finalArray['ranks'] = $ranks;
    // sleep(1);

    $timelineURL = "https://na1.api.riotgames.com/lol/match/v3/timelines/by-match/$matchID?api_key=" . API_KEY;
    $ch = curl_init($timelineURL);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, 0);
    $result = curl_exec($ch);
    $parsedTimeline = json_decode($result);
    $allItems = array();
    $allSkills = array();
    for ($i = 1; $i < 11; $i++) {
        $allItems[$i] = array();
        $allSkills[$i] = array();
    }
    $topKills = array();
    $midKills = array();
    $bottomKills = array();
    $jungleKills = array();
    $pastLaning = array();
    $length = count($parsedTimeline->frames);
    for ($i = 0; $i < $length; $i++) {
        $events = $parsedTimeline->frames[$i]->events;
        $eventLength = count($events);
        if ($eventLength != 0) {
            foreach ($events as $event) {
                $type = $event->type;
                if ($type === "CHAMPION_KILL") {
                    if ($event->timestamp < 1020000) {    
                        $x = $event->position->x;
                        $y = $event->position->y;
                        if ($y > $x - 5200 and $y < $x + 5200) {
                            array_push($midKills, $event);
                        } 
                        if ($y > $x + 3200) {
                            array_push($topKills, $event);
                        } else if ($y < $x - 3200) {
                            array_push($bottomKills, $event);
                        } 
                        if ($y > 5600 and $y < 13200 and $x > 1600 and $x < 9800) {
                            if ($y > $x + 800) {
                                array_push($jungleKills, $event);
                            }
                        } else if ($y > 1600 and $y < 9800 and $x > 5600 and $x < 13200) {
                            if ($y < $x - 800) {
                                array_push($jungleKills, $event);
                            }
                        }
                    } else {
                        array_push($pastLaning, $event);
                    }
                } else if ($type === "ITEM_PURCHASED" or $type === "ITEM_UNDO" or $type === "ITEM_SOLD") {
                    array_push($allItems[$event->participantId], $event);
                } else if ($type === "SKILL_LEVEL_UP") {
                    array_push($allSkills[$event->participantId], $event);
                }
            }
        }
    }
    $finalArray["lanes"] = array("top" => $topKills, "jungle" => $jungleKills, "mid" => $midKills, "bottom" => $bottomKills);
    $finalArray["pastLaning"] = $pastLaning;
    $finalArray["items"] = $allItems;
    $finalArray["skills"] = $allSkills;
    echo json_encode($finalArray, JSON_PRETTY_PRINT);
} catch(Exception $e) {
    // should change this to redirect to a new page
    echo "Error: " . $e->getMessage();
};
?>