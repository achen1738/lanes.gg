<?php
$registrationKey = "api_key=RGAPI-470136da-3c65-4436-b575-d2997e4a88da";
// Pepperminht's accID = 216014260 summonerID = 53382097

// 100T Levi's accID = 247997681

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

function duration($seconds) {
    $minutes = floor($seconds / 60);
    $remainder = $seconds % 60;
    return array(0 => "${minutes}m ${remainder}s", 1 => $minutes);

}

$i = 0;
$iPrime = $i + 5;




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

$dDragonData = array(1 => array('image' => array('full' => 'Annie.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 288), 'name' =>"Annie"), 2 => array('image' => array('full' => 'Olaf.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 48), 'name' =>"Olaf"), 3 => array('image' => array('full' => 'Galio.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 0), 'name' =>"Galio"), 4 => array('image' => array('full' => 'TwistedFate.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 336), 'name' =>"Twisted Fate"), 5 => array('image' => array('full' => 'XinZhao.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 96), 'name' =>"Xin Zhao"), 6 => array('image' => array('full' => 'Urgot.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 0), 'name' =>"Urgot"), 7 => array('image' => array('full' => 'Leblanc.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 0), 'name' =>"LeBlanc"), 8 => array('image' => array('full' => 'Vladimir.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 336), 'name' =>"Vladimir"), 9 => array('image' => array('full' => 'Fiddlesticks.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 336), 'name' =>"Fiddlesticks"), 10 => array('image' => array('full' => 'Kayle.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 144), 'name' =>"Kayle"), 11 => array('image' => array('full' => 'MasterYi.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 0), 'name' =>"Master Yi"), 12 => array('image' => array('full' => 'Alistar.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 144), 'name' =>"Alistar"), 13 => array('image' => array('full' => 'Ryze.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 240), 'name' =>"Ryze"), 14 => array('image' => array('full' => 'Sion.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 48), 'name' =>"Sion"), 15 => array('image' => array('full' => 'Sivir.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 96), 'name' =>"Sivir"), 16 => array('image' => array('full' => 'Soraka.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 240), 'name' =>"Soraka"), 17 => array('image' => array('full' => 'Teemo.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 96), 'name' =>"Teemo"), 18 => array('image' => array('full' => 'Tristana.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 192), 'name' =>"Tristana"), 19 => array('image' => array('full' => 'Warwick.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 432), 'name' =>"Warwick"), 20 => array('image' => array('full' => 'Nunu.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 0), 'name' =>"Nunu"), 21 => array('image' => array('full' => 'MissFortune.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 48), 'name' =>"Miss Fortune"), 22 => array('image' => array('full' => 'Ashe.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 336), 'name' =>"Ashe"), 23 => array('image' => array('full' => 'Tryndamere.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 288), 'name' =>"Tryndamere"), 24 => array('image' => array('full' => 'Jax.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 144), 'name' =>"Jax"), 25 => array('image' => array('full' => 'Morgana.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 192), 'name' =>"Morgana"), 26 => array('image' => array('full' => 'Zilean.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 384), 'name' =>"Zilean"), 27 => array('image' => array('full' => 'Singed.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 0), 'name' =>"Singed"), 28 => array('image' => array('full' => 'Evelynn.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 240), 'name' =>"Evelynn"), 29 => array('image' => array('full' => 'Twitch.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 384), 'name' =>"Twitch"), 30 => array('image' => array('full' => 'Karthus.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 0), 'name' =>"Karthus"), 31 => array('image' => array('full' => 'Chogath.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 336), 'name' =>"Cho'Gath"), 32 => array('image' => array('full' => 'Amumu.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 192), 'name' =>"Amumu"), 33 => array('image' => array('full' => 'Rammus.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 432), 'name' =>"Rammus"), 34 => array('image' => array('full' => 'Anivia.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 240), 'name' =>"Anivia"), 35 => array('image' => array('full' => 'Shaco.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 336), 'name' =>"Shaco"), 36 => array('image' => array('full' => 'DrMundo.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 96), 'name' =>"Dr. Mundo"), 37 => array('image' => array('full' => 'Sona.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 192), 'name' =>"Sona"), 38 => array('image' => array('full' => 'Kassadin.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 48), 'name' =>"Kassadin"), 39 => array('image' => array('full' => 'Irelia.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 432), 'name' =>"Irelia"), 40 => array('image' => array('full' => 'Janna.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 48), 'name' =>"Janna"), 41 => array('image' => array('full' => 'Gangplank.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 48), 'name' =>"Gangplank"), 42 => array('image' => array('full' => 'Corki.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 384), 'name' =>"Corki"), 555 => array('image' => array('full' => 'Pyke.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 288), 'name' =>"Pyke"), 44 => array('image' => array('full' => 'Taric.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 48), 'name' =>"Taric"), 45 => array('image' => array('full' => 'Veigar.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 144), 'name' =>"Veigar"), 48 => array('image' => array('full' => 'Trundle.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 240), 'name' =>"Trundle"), 50 => array('image' => array('full' => 'Swain.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 288), 'name' =>"Swain"), 51 => array('image' => array('full' => 'Caitlyn.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 192), 'name' =>"Caitlyn"), 53 => array('image' => array('full' => 'Blitzcrank.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 48), 'name' =>"Blitzcrank"), 54 => array('image' => array('full' => 'Malphite.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 336), 'name' =>"Malphite"), 55 => array('image' => array('full' => 'Katarina.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 96), 'name' =>"Katarina"), 56 => array('image' => array('full' => 'Nocturne.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48,
 'y' => 48, 'x' => 432), 'name' =>"Nocturne"), 57 => array('image' => array('full' => 'Maokai.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 432), 'name' =>"Maokai"), 58 => array('image' => array('full' => 'Renekton.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 48), 'name' =>"Renekton"), 59 => array('image' => array('full' => 'JarvanIV.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 96), 'name' =>"Jarvan IV"), 60 => array('image' => array('full' => 'Elise.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 192), 'name' =>"Elise"), 61 => array('image' => array('full' => 'Orianna.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 96), 'name' =>"Orianna"), 62 => array('image' => array('full' => 'MonkeyKing.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 96), 'name' =>"Wukong"), 63 => array('image' => array('full' => 'Brand.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 96), 'name' =>"Brand"), 64 => array('image' => array('full' => 'LeeSin.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 48), 'name' =>"Lee Sin"), 67 => array('image' => array('full' => 'Vayne.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 96), 'name' =>"Vayne"), 68 => array('image' => array('full' => 'Rumble.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 192), 'name' =>"Rumble"), 69 => array('image' => array('full' => 'Cassiopeia.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 288), 'name' =>"Cassiopeia"), 72 => array('image' => array('full' => 'Skarner.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 144), 'name' =>"Skarner"), 268 => array('image' => array('full' => 'Azir.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 432), 'name' =>"Azir"), 74 => array('image' => array('full' => 'Heimerdinger.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 336), 'name' =>"Heimerdinger"), 75 => array('image' => array('full' => 'Nasus.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 288), 'name' =>"Nasus"), 76 => array('image' => array('full' => 'Nidalee.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 384), 'name' =>"Nidalee"), 77 => array('image' => array('full' => 'Udyr.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 432), 'name' =>"Udyr"), 78 => array('image' => array('full' => 'Poppy.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 240), 'name' =>"Poppy"), 79 => array('image' => array('full' => 'Gragas.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 192), 'name' =>"Gragas"), 80 => array('image' => array('full' => 'Pantheon.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 192), 'name' =>"Pantheon"), 81 => array('image' => array('full' => 'Ezreal.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 288), 'name' =>"Ezreal"), 82 => array('image' => array('full' => 'Mordekaiser.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 144), 'name' =>"Mordekaiser"), 83 => array('image' => array('full' => 'Yorick.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 192), 'name' =>"Yorick"), 84 => array('image' => array('full' => 'Akali.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 96), 'name' =>"Akali"), 85 => array('image' => array('full' => 'Kennen.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 240), 'name' =>"Kennen"), 86 => array('image' => array('full' => 'Garen.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 96), 'name' =>"Garen"), 267 => array('image' => array('full' => 'Nami.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 240), 'name' =>"Nami"), 89 => array('image' => array('full' => 'Leona.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 96), 'name' =>"Leona"), 90 => array('image' => array('full' => 'Malzahar.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 384), 'name' =>"Malzahar"), 91 => array('image' => array('full' => 'Talon.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 0), 'name' =>"Talon"), 92 => array('image' => array('full' => 'Riven.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 144), 'name' =>"Riven"), 96 => array('image' => array('full' => 'KogMaw.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 432), 'name' =>"Kog'Maw"), 98 => array('image' => array('full' => 'Shen.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 384), 'name' =>"Shen"), 99 => array('image' => array('full' => 'Lux.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 288), 'name' =>"Lux"), 101 => array('image' => array('full' => 'Xerath.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 48), 'name' =>"Xerath"), 102 => array('image' => array('full' => 'Shyvana.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 432), 'name' =>"Shyvana"), 103 => array('image' => array('full' => 'Ahri.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 48), 'name' =>"Ahri"), 104 => array('image' => array('full' => 'Graves.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 240), 'name' =>"Graves"), 105 => array('image' => array('full' => 'Fizz.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 432), 'name' =>"Fizz"), 106 => array('image' => array('full' => 'Volibear.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 384), 'name' =>"Volibear"), 107 => array('image' => array('full' => 'Rengar.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 96), 'name' =>"Rengar"), 110 => array('image' => array('full' => 'Varus.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 48), 'name' =>"Varus"), 111 => array('image' => array('full' => 'Nautilus.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 336), 'name' =>"Nautilus"), 112 => array('image' => array('full' => 'Viktor.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 288), 'name' =>"Viktor"), 113 => array('image' => array('full' => 'Sejuani.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 288), 'name' =>"Sejuani"), 114 => array('image' => array('full' => 'Fiora.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 384), 'name' =>"Fiora"), 115 => array('image' => array('full' => 'Ziggs.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 336), 'name' =>"Ziggs"), 117 => array('image' => array('full' => 'Lulu.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 240), 'name' =>"Lulu"), 119 => array('image' => array('full' => 'Draven.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 48), 'name' =>"Draven"), 120 => array('image' => array('full' => 'Hecarim.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 288), 'name' =>"Hecarim"), 121 => array('image' => array('full' => 'Khazix.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 288), 'name' =>"Kha'Zix"), 122 => array('image' => array('full' => 'Darius.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 432), 'name' =>"Darius"), 126 => array('image' => array('full' => 'Jayce.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 192), 'name' =>"Jayce"), 127 => array('image' => array('full' => 'Lissandra.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 144), 'name' =>"Lissandra"), 131 => array('image' => array('full' => 'Diana.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 0), 'name' =>"Diana"), 133 => array('image' => array('full' => 'Quinn.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 336), 'name' =>"Quinn"), 134 => array('image' => array('full' => 'Syndra.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 336), 'name' =>"Syndra"), 136 => array('image' => array('full' => 'AurelionSol.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 384), 'name' =>"Aurelion Sol"), 141 => array('image' => array('full' => 'Kayn.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 192), 'name' =>"Kayn"), 516 => array('image' => array('full' => 'Ornn.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 144), 'name' =>"Ornn"), 143 => array('image' => array('full' => 'Zyra.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 0), 'name' =>"Zyra"), 145 => array('image' => array('full' => 'Kaisa.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 336), 'name' =>"Kai'Sa"), 150 => array('image' => array('full' => 'Gnar.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 144), 'name' =>"Gnar"), 154 => array('image' => array('full' => 'Zac.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 240), 'name' =>"Zac"), 412 => array('image' => array('full' => 'Thresh.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 144), 'name' =>"Thresh"), 157 => array('image' => array('full' => 'Yasuo.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 144), 'name' =>"Yasuo"), 161 => array('image' => array('full' => 'Velkoz.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 192), 'name' =>"Vel'Koz"), 163 => array('image' => array('full' => 'Taliyah.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 432), 'name' =>"Taliyah"), 164 => array('image' => array('full' => 'Camille.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 240), 'name' =>"Camille"), 421 => array('image' => array('full' => 'RekSai.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 0), 'name' =>"Rek'Sai"), 427 => array('image' => array('full' => 'Ivern.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 0), 'name' =>"Ivern"), 429 => array('image' => array('full' => 'Kalista.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 384), 'name' =>"Kalista"), 142 => array('image' => array('full' => 'Zoe.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 432), 'name' =>"Zoe"), 43 => array('image' => array('full' => 'Karma.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 432), 'name' =>"Karma"), 266 => array('image' => array('full' => 'Aatrox.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 0), 'name' =>"Aatrox"), 432 => array('image' => array('full' => 'Bard.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 0), 'name' =>"Bard"), 201 => array('image' => array('full' => 'Braum.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 144), 'name' =>"Braum"), 202 => array('image' => array('full' => 'Jhin.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 240), 'name' =>"Jhin"), 203 => array('image' => array('full' => 'Kindred.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 336), 'name' =>"Kindred"), 420 => array('image' => array('full' => 'Illaoi.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 384), 'name' =>"Illaoi"), 222 => array('image' => array('full' => 'Jinx.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 288), 'name' =>"Jinx"), 223 => array('image' => array('full' => 'TahmKench.png', 'sprite' => 'champion3.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 384), 'name' =>"Tahm Kench"), 236 => array('image' => array('full' => 'Lucian.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 192), 'name' =>"Lucian"), 238 => array('image' => array('full' => 'Zed.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 288), 'name' =>"Zed"), 240 => array('image' => array('full' => 'Kled.png', 'sprite' => 'champion1.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 384), 'name' =>"Kled"), 497 => array('image' => array('full' => 'Rakan.png', 'sprite' => 'champion2.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 384), 'name' =>"Rakan"), 498 => array('image' => array('full' => 'Xayah.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 48, 'x' => 0), 'name' =>"Xayah"), 245 => array('image' => array('full' => 'Ekko.png', 'sprite' => 'champion0.png', 'h' => 48, 'w' => 48, 'y' => 96, 'x' => 144), 'name' =>"Ekko"), 254 => array('image' => array('full' => 'Vi.png', 'sprite' => 'champion4.png', 'h' => 48, 'w' => 48, 'y' => 0, 'x' => 240), 'name' =>"Vi"));

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
$eIndex = 5;
$endIndex = "endIndex=$eIndex";

//https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/216014260?beginIndex=0&endIndex=20&api_key=RGAPI-edcc3a08-1168-4953-87bc-82c80e331297
$matchListURL = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/$accID?$endIndex&$registrationKey";
curl_setopt($ch, CURLOPT_URL, $matchListURL);
$result = curl_exec($ch);
$matchlistJsonObj = json_decode($result);
$matches = array();

$numMatches = 20;
//https://na1.api.riotgames.com/lol/match/v3/matchlists/
//by-account/216014260?beginIndex=600&endIndex=700&season=11&api_key=RGAPI-2317b435-f34d-404b-a927-61b76fc33d1d


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
                $data["champName"] = $dDragonData[$gameJsonObj->participants[$k]->championId]['name'];
                $data["info"] = $gameJsonObj->participants[$k];
                $data["image"] = $dDragonData[$gameJsonObj->participants[$k]->championId]['image'];
                array_push($bigArray, $data);
            }
            $bigArray["matchID"] = $gameJsonObj->gameId;
            $bigArray["queueId"] = $queueTypes[$gameJsonObj->queueId];
            $bigArray["time"] = timeAgo($gameJsonObj->gameCreation, $gameJsonObj->gameDuration);
            $bigArray["duration"] = duration($gameJsonObj->gameDuration)[0];
            $bigArray["minutes"] = duration($gameJsonObj->gameDuration)[1];
            // Push the array containing all the details of a match into the final array which will contain all matches
            array_push($matches, $bigArray);
        }
    }
}
// echo json_encode(new ArrayValue($matches), JSON_PRETTY_PRINT);
// close cURL resource, and free up system resources

$finalData["matches"] = $matches;
$finalData["summoner"] = $leagueJsonObj;

echo json_encode(new ArrayValue($finalData), JSON_PRETTY_PRINT);
// echo json_encode($dDragonData[1]['name']);
curl_close($ch);   
?>