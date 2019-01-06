import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import blueDragon from "./../../images/objectives/dragon_100.png";
import blueRift from "./../../images/objectives/riftherald_100.png";
import blueBaron from "./../../images/objectives/baron_nashor_100.png";
import redDragon from "./../../images/objectives/dragon_200.png";
import redRift from "./../../images/objectives/riftherald_200.png";
import redBaron from "./../../images/objectives/baron_nashor_200.png";

class BoxScore extends Component {
  state = { topTeam: [], bottomTeam: [], username: null };

  componentWillMount() {
    var topTeam = [];
    var bottomTeam = [];
    const matches = this.props.matches;
    // console.log(this.props.matches[0].teamID);
    const username = window.location.search
      .substring(10)
      .split("+")
      .join(" ");
    const usersTeamID = matches.find(match => {
      return match.username.toLowerCase() === username.toLowerCase();
    }).teamID;
    matches.forEach(match => {
      match.teamID === usersTeamID
        ? topTeam.push(match)
        : bottomTeam.push(match);
    });
    this.setState({ topTeam, bottomTeam, username });
  }

  createRunes(match) {
    var keystoneURL, secondaryURL, spell1URL, spell2URL;
    const runesObj = this.props.runes;
    const trees = Object.values(runesObj);
    trees.forEach(tree => {
      if (tree.id === match.primaryPerk) {
        const keystones = tree.slots[0].runes;
        keystones.forEach(keystone => {
          if (keystone.id === match.primaryTree[0]) {
            keystoneURL = keystone.icon;
          }
        });
      } else if (tree.id === match.secondaryPerk) {
        secondaryURL = tree.icon;
      }
    });

    const spellsObj = this.props.summonerSpells;
    const spells = Object.values(spellsObj.data);
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
    var counter = 0;
    return match.items.map(item => {
      if (item === 0) item = 3637;
      return (
        <div key={`item${counter++}`} className="Item">
          <img src={itemURL + item + ".png"} alt="Item!" />
        </div>
      );
    });
  }

  createPlayers(team) {
    return team.map(player => {
      const ratio =
        player.deaths === 0
          ? "Perfect"
          : ((player.kills + player.assists) / player.deaths).toFixed(2);
      const creeps = player.totalMinionsKilled;
      const camps = player.jungleEnemy + player.jungleTeam;
      const cs = creeps + camps;
      const minutes = Math.floor(player.gameDuration / 60);
      const cspm = (cs / minutes).toFixed(1);
      return (
        <React.Fragment key={player.username}>
          <tr
            className={
              "teamRow" +
              (player.username.toLowerCase() ===
              this.state.username.toLowerCase()
                ? " userActive"
                : "")
            }
          >
            <td className="playerChamp">
              <img
                src={
                  this.props.champURL + this.props[player.championID].image.full
                }
                alt="Champion!"
              />
            </td>
            <td className="playerRunes">
              {this.createRunes(player)}
              <div className="playerLevel">
                <div className="cLevelContainer">{player.champLevel}</div>
              </div>
            </td>
            <td className="playerName">{player.username}</td>
            <td className="playerItems">{this.createItems(player)}</td>
            <td className="rowCell playerStats">
              <div className="KDA">
                {`${player.kills} / ${player.deaths} / ${player.assists}`}
              </div>
              <div className="Ratio">{ratio}</div>
            </td>
            <td className="rowCell playerDmg">{player.damageDone}</td>
            <td
              className="rowCell playerVision"
              data-tool-tip={`Vision Score: ${
                player.visionScore
              }\nWards Placed: ${player.wardsPlaced}\nControl Wards: ${
                player.visionWards
              }`}
            >
              <div className="visionScore">{player.visionScore}</div>
              <div className="playerWards">
                {`${player.visionWards} / ${player.wardsPlaced}`}
              </div>
            </td>
            <td className="rowCell playerCS">{`${cs} (${cspm})`}</td>
            <td className="rowCell playerGold">
              {`${(player.goldEarned / 1000).toFixed(0)}k`}
            </td>
          </tr>
        </React.Fragment>
      );
    });
  }

  createTeam(team) {
    var result;
    var win;
    if (typeof team[0] != "undefined") win = team[0].win;
    result = win === 0 ? "Victory" : "Defeat";
    return (
      <table className="teamDetails">
        <thead className="teamHeader">
          <tr>
            <th style={{ textAlign: "left", paddingLeft: "11px" }}>{result}</th>
            <th style={{ width: "25.5%" }}>Items</th>
            <th style={{ width: "10.5%" }}>KDA</th>
            <th style={{ width: "9.75%" }}>Damage</th>
            <th style={{ width: "9.5%" }}>Vision</th>
            <th style={{ width: "10.5%" }}>CS</th>
            <th style={{ width: "7%" }}>Gold</th>
          </tr>
        </thead>
        <tbody
          className={"teamContent " + (win === 0 ? "lightBlue" : "lightRed")}
        >
          {this.createPlayers(team)}
        </tbody>
      </table>
    );
  }

  createBarData() {
    const topTeamStats = this.state.topTeam.reduce((a, b) => ({
      goldEarned: a.goldEarned + b.goldEarned,
      kills: a.kills + b.kills
    }));

    const bottomTeamStats = this.state.bottomTeam.reduce((a, b) => ({
      goldEarned: a.goldEarned + b.goldEarned,
      kills: a.kills + b.kills
    }));

    console.log(topTeamStats);
    console.log(bottomTeamStats);
    return [
      {
        label: ["Gold Earned"],
        datasets: [
          {
            data: [topTeamStats.goldEarned],
            label: "Top Team",
            backgroundColor: "rgba(55, 160, 225, 0.7)",
            datalabels: {
              align: "center",
              anchor: "center"
            }
          },
          {
            data: [bottomTeamStats.goldEarned],
            label: "Bottom Team",
            backgroundColor: "rgba(225, 58, 55, 0.7)",
            datalabels: {
              align: "center",
              anchor: "center"
            }
          }
        ]
      },
      {
        label: ["Kills"],
        datasets: [
          {
            data: [topTeamStats.kills],
            label: "Top Team",
            backgroundColor: "rgba(55, 160, 225, 0.7)",
            datalabels: {
              align: "center",
              anchor: "center"
            }
          },
          {
            data: [bottomTeamStats.kills],
            label: "Bottom Team",
            backgroundColor: "rgba(225, 58, 55, 0.7)",
            datalabels: {
              align: "center",
              anchor: "center"
            }
          }
        ]
      }
    ];
  }

  createSummary() {
    const dataOptions = this.createBarData();
    const goldOptions = dataOptions[0];
    const killOption = dataOptions[1];
    const graphOptions = {
      responsive: false,
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

    const topObjectives =
      this.props.match.win === 0
        ? [blueDragon, blueRift, blueBaron]
        : [redDragon, redRift, redBaron];
    const bottomObjectives =
      this.props.match.win === 0
        ? [redDragon, redRift, redBaron]
        : [blueDragon, blueRift, blueBaron];

    return (
      <React.Fragment>
        <div className="objectives topObjectives">
          <img src={topObjectives[0]} alt="Dragon!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
          <img src={topObjectives[1]} alt="Rift!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
          <img src={topObjectives[2]} alt="Baron!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
        </div>
        <div className="graphSection">
          <div className="boxscoreGraphs">
            <span>Total Gold</span>
            <HorizontalBar
              key={"barGraph" + this.props.match.matchID}
              id={"barGraph" + this.props.match.matchID}
              data={goldOptions}
              options={graphOptions}
              width={300}
              height={20}
            />
          </div>
          <div className="boxscoreGraphs">
            <span>Total Kills</span>
            <HorizontalBar
              key={"barGraph" + this.props.match.matchID}
              id={"barGraph" + this.props.match.matchID}
              data={killOption}
              options={graphOptions}
              width={300}
              height={20}
            />
          </div>
        </div>
        <div className="objectives bottomObjectives">
          <img src={bottomObjectives[0]} alt="Dragon!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
          <img src={bottomObjectives[1]} alt="Rift!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
          <img src={bottomObjectives[2]} alt="Baron!" />
          <div className="objectiveCount">
            <span>5</span>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.createTeam(this.state.topTeam)}
        <div className="summaryContainer">{this.createSummary()}</div>
        {this.createTeam(this.state.bottomTeam)}
      </React.Fragment>
    );
  }
}

export default BoxScore;
