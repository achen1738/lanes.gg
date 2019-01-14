# lanes.gg
I wanted to create a website that functioned similar to na.op.gg, which analyzed match data for a popular game called League of Legends but focused on a completely different aspect of a specific match. Currently, na.op.gg displays essentially the box score, or end the end result of a match. However, I wanted to display data that happened at various points of the game, showing users how the game developed to its outcome. For example, this website can show users what happened in each lane for the first ~18 minutes, which is what I consider as the laning phase, to what happened in the mid to late game where players start to move around more. The end goal of this website is to be able to help players improve their own gameplay by highlighting either their own mistakes or highlighting what professionals do better. Also, to highlight the events in a game that lead to advantages for either team.

## Languages
The backend is built with NodeJS and Express with REST endpoints that connect to a mlab/mongoDB database using mongoose. The front end was built with ReactJS.

## Deployment
Well, to be honest I do not know how to let other connect to my own databse safely? (is there like security issues / bad to give people actual access to my database) But, all you have to do is pull the repository, and create a .env file in the /riot/javascript/backend/ folder with 3 values. user, password, and key. "user" and "password" relate to your mongoDB database. Key refers to Riot's development key that you can get by visiting https://developer.riotgames.com/. Finally, all you have to do is type run -- (no quotes) "npm start" in the /riot folder, and "npm run server" in the riot/javascript/backent folder.

## Demo
![](newLane2.gif)

## To Do (Updated)
I think CSS (I should switch to using like SASS or something) can always be worked on.

I now have all the basics implemented such as, boxscore results, each other players builds (runes, items, skills), and the results
of each lane displayed. I now want to do more data analysis over all of a user's games. This means I need to populate my collections with all of the games of every player (I'll do just a few players at first). I want to keep track of like average number of wards in the first 10 minutes, average first/second kill (includes assist), and first/second death. Also, I feel like some of my queries are slow/inefficient, partially because they were originally MUCH faster (like instant, now like .5s) in a relational database. However, because of the timeline records, which vary from game-to-game I chose to use an object-oriented database (mongoDB). Should look into if its actually acceptable to use two different types of database systems.

I definitely think the builds section needs restructuring, but I can't think of a better way of displaying the section. I would also like to add objective events, tied with the events of lane. Specifically, let's say theres a 2 for 0 trade in the bottom lane, I would like to track if that leads into a tower kill. This idea would applied to team fights leading to other objectives, and display where and the game swung towards one team. I also want to be able to display the rank of every player in a game, meaning I need to populate my players table with every user, which I can do recursively.

