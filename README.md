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
There is a bunch I want to change, I want to eventually use actual frameworks like ReactJS for the front end and NodeJS for the backend. I also need a database to store data for each region.


