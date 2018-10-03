<<<<<<< HEAD:src/php/miscellaneous.php
<?php

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$registrationKey = "api_key=RGAPI-293a90cd-8b0e-4d78-ba5b-c008f2568bcd";
$gameID = 2810445590;
$gameURL = "https://na1.api.riotgames.com/lol/match/v3/matches/$gameID?$registrationKey";

// Retrieve the JSON object from the gameID
curl_setopt($ch, CURLOPT_URL, $gameURL);
$result = curl_exec($ch);
$gameJsonObj = json_decode($result);
// echo $result;
for ($i = 0; $i < 10; $i++) {
    $summoner = $gameJsonObj->participants[$i];
    if ($i == 0 || $i == 5) {
        echo $summoner->teamId;
        echo "<br>";
    }
    echo $summoner->timeline->lane;
    echo "<br>";
    echo $summoner->timeline->role;
    echo "<br>";
    echo "<br>";
}

curl_close($ch);
// echo json_encode(new ArrayValue($dDragonData), JSON_PRETTY_PRINT);


=======
<?php

class ArrayValue implements JsonSerializable {
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$registrationKey = "api_key=RGAPI-e80c5ff9-6b4b-4458-8095-9a4b58eb06e9";
$gameID = 2810445590;
$gameURL = "https://na1.api.riotgames.com/lol/match/v3/matches/$gameID?$registrationKey";

// Retrieve the JSON object from the gameID
curl_setopt($ch, CURLOPT_URL, $gameURL);
$result = curl_exec($ch);
$gameJsonObj = json_decode($result);
// echo $result;
for ($i = 0; $i < 10; $i++) {
    $summoner = $gameJsonObj->participants[$i];
    if ($i == 0 || $i == 5) {
        echo $summoner->teamId;
        echo "<br>";
    }
    echo $summoner->timeline->lane;
    echo "<br>";
    echo $summoner->timeline->role;
    echo "<br>";
    echo "<br>";
}

curl_close($ch);
// echo json_encode(new ArrayValue($dDragonData), JSON_PRETTY_PRINT);


>>>>>>> 00e53017b587796ce579590a2b550028530cdcfc:www/php/miscellaneous.php
?>