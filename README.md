# lanes.gg

I wanted to create a website that functioned similar to na.op.gg, which analyzed match data for a popular game called League of Legends but focused on a completely different aspect of a specific match. Currently, na.op.gg displays essentially the box score, or end the end result of a match. However, I wanted to display data that happened at various points of the game, showing users how the game developed to its outcome. For example, this website can show users what happened in each lane for the first ~18 minutes, which is what I consider as the laning phase, to what happened in the mid to late game where players start to move around more. The end goal of this website is to be able to help players improve their own gameplay by highlighting either their own mistakes or highlighting what professionals do better. Also, to highlight the events in a game that lead to advantages for either team.

## Languages

The backend is built with NodeJS and Express with REST endpoints that connect to a mlab/mongoDB database using mongoose. The front end was built with ReactJS/Redux/Saga and styled with SCSS

## Deployment

Just type `npm run dev` in console and everything should work locally. Currently nothing is connected to DB so.

## Demo

### Before (first iteration)

![](lanegif1.gif)

### Before (second iteration)

![](newLane2.gif)

## To Do (Updated)

THIRD ITERATION

Well, now that I know more, here are the following things I'm going to do

- [x] Restructure the file system to be more like how my team at IBM organizes their files.
- [ ] Integrate redux + saga into each module.
- [ ] Rewrite the backend to use both a cloud relational db and non-relational db
- [ ] Transition big CSS files to individual SCSS files for each component/container
- [ ] Rewrite API to follow better API standards
- [ ] Make a better design + just use better styling standards
