import React, { Component } from "react";
import "./../../css/overview.css";
import "./../../css/main_page.css";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
class FrequentlyPlayed extends Component {
  state = {
    recentGames: [],
    enemyGames: [],
    graphStyle: {},
    mostPlayed: {},
    mostPlayedAgainst: {},
    barmostPlayed0: null,
    barmostPlayed1: null,
    barmostPlayed2: null,
    barmostPlayedAgainst0: null,
    barmostPlayedAgainst1: null,
    barmostPlayedAgainst2: null
  };

  async componentDidMount() {
    const graphStyle = {
      width: "150px",
      height: "40px",
      display: "inline-block"
    };
    const username = window.location.search.substring(10);
    const resp = await fetch(
      `http://localhost:5000/matches/userOverview/${username}/20`
    );
    const recentGames = await resp.json();
    const enemy = await fetch(
      `http://localhost:5000/matches/enemyOverview/${username}/20`
    );
    const enemyGames = await enemy.json();

    console.log(recentGames);
    console.log(enemyGames);
    this.setState({
      recentGames,
      enemyGames,
      graphStyle,
      mostPlayed: { first: false, second: false, third: false },
      mostPlayedAgainst: { first: false, second: false, third: false }
    });
  }

  expand(e) {
    var id = e.currentTarget.id;
    const length = id.length - 1;
    const classes = ["first", "second", "third"];
    const index = parseInt(id.substring(length));
    const type = classes[index];
    const container = id.substring(0, length - 3);
    var newVisibility = {};

    /* Basically whenever I click a button, close all other tabs by making
    their state in mostPlayed/mostPlayedAgainst false. However, for the tab that
    was clicked, its visibility value is negated allowing us to be able to close 
    and open the same tab. */
    for (var i = 0; i < 3; i++) {
      if (type === classes[i]) {
        newVisibility[type] = !this.state[container][type];
      } else {
        newVisibility[classes[i]] = false;
      }
    }
    if (container === "mostPlayed") {
      this.setState({ mostPlayed: newVisibility });
    } else {
      this.setState({ mostPlayedAgainst: newVisibility });
    }
  }

  createContainers(champArray, containerName) {
    return (
      <div className={containerName + "Wrapper"}>
        <span>
          {containerName === "mostPlayed"
            ? "Most Played"
            : "Most Played Against"}
        </span>
        <div className={containerName}>
          {this.createChampDivs(champArray, containerName)}
        </div>
      </div>
    );
  }

  createChampList(arr) {
    // console.log(arr[0]);
    // console.log(this.props.runes);
    // console.log(this.props.summonerSpells);

    /* Iterate through each game in the array. (The array only holds games
    of the same champ ID) */
    return arr.map(game => {
      const CS = game.jungleEnemy + game.jungleTeam + game.totalMinionsKilled;
      const itemURL = this.props.itemURL;
      var result = game.win === 1 ? "Loss" : "Win";
      return (
        <div key={game.matchID} className={"champMatch " + result}>
          <div className="SpellsnRunes">
            {this.createRunes(game)}
            <div className="cLevel">
              <div className="cLevelContainer">{game.champLevel}</div>
            </div>
          </div>
          <div className="Stats">
            <div className="KDA">
              {game.kills} / {game.deaths} / {game.assists}
            </div>
            <div className="CS">{CS} CS</div>
          </div>
          <div className="Items">{this.createItems(game)}</div>
          <div className="Trinket">
            <div className="Item">
              <img src={itemURL + game.items[6] + ".png"} alt="Item!" />
            </div>
          </div>
        </div>
      );
    });
  }

  createRunes(match) {
    var keystoneURL, secondaryURL, spell1URL, spell2URL;
    const runesObj = this.props.runes;
    const trees = Object.values(runesObj);

    /* Iterate through the runes object's values */
    trees.forEach(tree => {
      // If the id matches with the primary perk or secondary Perk
      if (tree.id === match.primaryPerk) {
        const keystones = tree.slots[0].runes;
        // Find the keystone that matches, then store its URL
        keystones.forEach(keystone => {
          if (keystone.id === match.primaryTree[0]) {
            keystoneURL = keystone.icon;
          }
        });
      } else if (tree.id === match.secondaryPerk) {
        // Store its URL
        secondaryURL = tree.icon;
      }
    });

    const spellsObj = this.props.summonerSpells;
    const spells = Object.values(spellsObj.data);
    // Same thing, iterate through spells object's values and store
    // the image URLs for the spells that match with the users spells.
    spells.forEach(spell => {
      if (parseInt(spell.key) === match.spell1ID) {
        spell1URL = spell.image.full;
      } else if (parseInt(spell.key) === match.spell2ID) {
        spell2URL = spell.image.full;
      }
    });
    const imageURLs = [spell1URL, spell2URL, keystoneURL, secondaryURL];
    return imageURLs.map(image => {
      var url;
      if (image.substring(0, 8) === "Summoner")
        url = this.props.spellURL + image;
      else url = this.props.runeURL + image;
      return (
        <div key={image} className="Rune">
          <img src={url} alt="Rune or Spell!" />
        </div>
      );
    });
  }

  createItems(match) {
    const itemURL = this.props.itemURL;
    var items = [
      match.items[0],
      match.items[1],
      match.items[2],
      match.items[3],
      match.items[4],
      match.items[5]
    ];
    // console.log(match);

    // Items doesn't include the trinket, but I probably could have just
    // used an if statement
    var counter = 0;
    return items.map(item => {
      if (item === 0) item = 3637;
      return (
        <div key={`item${counter++}`} className="Item">
          <img src={itemURL + item + ".png"} alt="Item!" />
        </div>
      );
    });
  }

  createChampDivs(champArray, containerName) {
    const classes = ["first", "second", "third"];
    var index = -1;
    const imageURL = this.props.champURL;
    return champArray.map(arr => {
      /* Unintuitive, but I made wins be a 0, so
      wins in this object really represent the number
      of losses */
      var sumStats = arr.reduce((a, b) => ({
        kills: a.kills + b.kills,
        deaths: a.deaths + b.deaths,
        assists: a.assists + b.assists,
        win: a.win + b.win
      }));
      index += 1;
      let numGames = arr.length;
      let wins = numGames - sumStats.win;
      // This is correct, look at above comment
      let losses = sumStats.win;
      var kda;
      if (sumStats.deaths === 0) kda = "Perfect";
      else {
        kda = ((sumStats.kills + sumStats.assists) / sumStats.deaths).toFixed(
          2
        );
      }
      const champInfo = this.props[arr[0].championID];
      let chartData = {
        label: ["Wins", "Losses"],
        datasets: [
          {
            data: [wins],
            label: `bar${containerName}${index}Wins`,
            backgroundColor: ["#36a2eb"],
            borderColor: ["#14a0ff"],
            datalabels: {
              align: "center",
              anchor: "center",
              display: function() {
                return wins > 0;
              }
            }
          },
          {
            data: [losses],
            label: `bar${containerName}${index}Losses`,
            backgroundColor: ["#ff6384"],
            borderColor: ["#ff3d66"],
            datalabels: {
              align: "center",
              anchor: "center",
              display: function() {
                return losses > 0;
              }
            }
          }
        ]
      };
      let chartOptions = {
        responsive: true,
        tooltips: false,
        // hover: {mode: null},
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false, //this will remove all the x-axis grid lines
              stacked: true
            }
          ],
          yAxes: [
            {
              display: false,
              stacked: true
            }
          ]
        },
        plugins: {
          datalabels: {
            color: "white",
            font: {
              weight: "bold"
            },
            formatter: Math.round
          }
        }
      };

      const hBarGraph = (
        <HorizontalBar
          key={`bar${containerName}${index}`}
          id={`bar${containerName}${index}`}
          data={chartData}
          options={chartOptions}
          width={150}
          height={40}
        />
      );
      var color;
      if (containerName === "mostPlayed")
        color = this.state[containerName][classes[index]]
          ? "darkBlue"
          : "lightBlue";
      else
        color = this.state[containerName][classes[index]]
          ? "darkRed"
          : "lightRed";
      // var data, options;
      return (
        <React.Fragment key={`sb${index}`}>
          <div className={"subContainer " + classes[index]}>
            <div className="mostPlayedChamp">
              <div className="cImg">
                <img src={imageURL + champInfo.image.full} alt="Champion!" />
              </div>
              <div className="champStats">
                <div className="cName">{champInfo.name}</div>
                <div className="cWins">{`${((wins / numGames) * 100).toFixed(
                  0
                )}% (${wins}W ${losses}L)`}</div>
                <div className="KDA">{kda} KDA</div>
              </div>
            </div>
            <i className="leftArrow" onClick={e => this.expand(e)} />
            <div
              className={
                "buttonBackground " + containerName + index + " " + color
              }
              id={`${containerName}Btn${index}`}
              onClick={e => this.expand(e)}
            />
          </div>
          {this.state[containerName][classes[index]] ? (
            <div className={"infoContainer " + classes[index]}>
              <div className={"expandedContainer"}>
                <div className="champHeader">
                  <div className="champImage">
                    <img
                      src={imageURL + champInfo.image.full}
                      alt="Champion!"
                    />
                  </div>
                  <div
                    className="barGraphContainer"
                    style={this.state.graphStyle}
                  >
                    {hBarGraph}
                  </div>
                  <div className="champList">{this.createChampList(arr)}</div>
                </div>
              </div>
            </div>
          ) : null}
        </React.Fragment>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.createContainers(this.state.recentGames, "mostPlayed")}
        {this.createContainers(this.state.enemyGames, "mostPlayedAgainst")}
      </React.Fragment>
    );
  }
}

export default FrequentlyPlayed;
