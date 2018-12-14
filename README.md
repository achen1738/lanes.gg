# lanes.gg
I wanted to create a website that functioned similar to na.op.gg, which analyzed match data for a popular game called League of Legends but focused on a completely different aspect of a specific match. Currently, na.op.gg displays essentially the box score, or end the end result of a match. However, I wanted to display data that happened at various points of the game, showing users how the game developed to its outcome. For example, this website can show users what happened in each lane for the first ~18 minutes, which is what I consider as the laning phase, to what happened in the mid to late game where players start to move around more. The end goal of this website is to be able to help players improve their own gameplay by highlighting either their own mistakes or highlighting what professionals do better
## Getting Started/Installing
Because this website is not actual hosted, in order to actually run it you first have to clone the repository. I use a PHP backend, which means you must also have some way to run PHP on your own laptop. I used Apache HTTP Server from http://httpd.apache.org/. Once you install this, you must change several things in the configuration files. The exact details can be found in this video: 
```
https://www.youtube.com/watch?v=kuMTZowwjus.
```
Once you have that set up, you must switch the API keys found in:
```
details.php
php-riot-api
moreGames.php
recentGames.php
riot.php
```
Specifically, each file should have a field that says something like this:
```
const API_KEY = 'RGAPI-293a90cd-8b0e-4d78-ba5b-c008f2568bcd';
```
Go to https://developer.riotgames.com/, sign in with your League account if you have one, and then go down to DEVELOPMENT API KEY and generate a new key. Replace that key with API keys found in the aforementioned files.
## Deployment
From here simply run the Apache server, open up your browser and go to your localhost. From there go to src->html->home.html. From here a browser should appear with a text field right in the middle. The website functions just like na.op.gg so just type in a username from League of Legends and it’ll redirect you. In a couple of seconds, a bunch of matches will appear on your screen. At the top, you can click on the individual blue square to see which games resulted in either your greatest win rate or worst win rate against. For each match below, you can click on the side with the darkened arrow in order to view more specific game. From here you can see the overview of the game, builds for each individual player, and the events of each lane for the first eighteen minutes.
## Demo
![](lanegif1.gif)
## To Do (Will start working on this again when winter break starts)
There is a bunch I want to change, I want to eventually use actual frameworks like ReactJS for the front end and NodeJS for the backend. I also need a database to store data for each region. The specifics for the databases would probably be something like this(?):
```
PLAYER(accID Integer, summonerID Integer, summonerName VARCHAR(20), division VARCHAR(20), points Integer);
MATCHES(accID Integer, matchID Integer);
DETAILS(matchID Integer, …);
```
A big concern of this is that is it smarter to have individual tables of matches for each player, such that I can easily regulate the size of this table. This makes it so that I can store less data like only 100 matches per player. However this would then mean I would have to create millions of tables. Also, I would have to think about how I want to normalize the details of each match, and what I consider to be important. Another concern would be whether or not my details tables is created for each player or just one giant global one. I do not know if it is feasible to have a details table for each player, but I also do not know if it is possible to have a table with around 200 million entries, which could also apply to the matches table. Once, I set up the capability to hold onto large amounts of data I want to keep track of stats like, first kill, first death, average amount of kills outside of lane, etc…
Also, I currently cannot handle the special game modes, so that might be messing some stuff up.


