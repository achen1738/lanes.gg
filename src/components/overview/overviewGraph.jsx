import React, { Component } from "react";
import "./../../css/overview.css";
import "chartjs-plugin-datalabels";
import "chart.piecelabel.js";
import { Pie } from "react-chartjs-2";

class OverviewGraph extends Component {
  state = { gameResults: {}, graphStyle: {} };

  drawGraph(gameResults) {
    var data = {
      labels: ["Losses", "Wins"],
      datasets: [
        {
          data: [gameResults.losses, gameResults.games - gameResults.losses],
          backgroundColor: ["#ff6384", "#36a2eb"],
          label: "daddy"
        }
      ]
    };

    var options = {
      responsive: false,
      legend: {
        display: false
      },
      pieceLabel: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        mode: "percentage",

        // font size, default is defaultFontSize
        fontSize: 14,

        fontColor: "#fff"
      },
      plugins: {
        datalabels: {
          display: false
        }
      }
    };

    return (
      <Pie data={data} options={options} width={145} height={140} id="graph" />
    );
  }

  async componentDidMount() {
    const graphStyle = { width: "145px", height: "140px" };
    const username = window.location.search.substring(10);
    const numGames = 20;
    const resp = await fetch(
      `http://localhost:5000/matches/numLosses/${username}/${numGames}`
    );
    const gameResults = await resp.json();
    gameResults["games"] = numGames;
    this.setState({ gameResults, graphStyle });
  }

  getWinLoss() {
    const obj = this.state.gameResults;
    console.log(obj);
    const losses = obj.losses;
    const games = obj.games;
    const wins = games - losses;
    return `${games}G ${wins}W ${losses}L`;
  }

  getAverageKDA() {
    const obj = this.state.gameResults;
    const games = obj.games;

    const kills = (obj.kills / games).toFixed(1);
    const deaths = (obj.deaths / games).toFixed(1);
    const assists = (obj.assists / games).toFixed(1);
    const kda = ((obj.kills + obj.assists) / obj.deaths).toFixed(2);
    return `${kills} / ${deaths} / ${assists} (${kda})`;
  }

  render() {
    return (
      <div className="recentWinRateWrapper">
        <span>Recent Stats</span>
        <div className="recentWinRate">
          <div className="totalGames">{this.getWinLoss()}</div>
          {this.drawGraph(this.state.gameResults)}
          <div className="averageKDA">{this.getAverageKDA()}</div>
        </div>
      </div>
    );
  }
}

export default OverviewGraph;
