import React, { Component } from "react";
class MatchPlayers extends Component {
  state = {};

  createPlayers() {
    const matches = this.props.matches;
    var arr = [];
    for (var i = 0; i < 2; i++) {
      var team = [];
      for (var j = 0; j < 5; j++) {
        var index = 5 * i + j;
        team.push(matches[index]);
      }
      arr.push(team);
    }
    var counter = 0;
    var playerCounter = 0;
    return arr.map(team => {
      return (
        <div key={`team${counter++}`} className="Team">
          {team.map(player => {
            const image = this.props[player.championID].image.full;
            return (
              <div key={`summoner${playerCounter++}`} className="Summoner">
                <div className="SummImage">
                  <img src={this.props.champURL + image} alt="Champion!" />
                </div>
                <div className="IGN">{player.username}</div>
              </div>
            );
          })}
        </div>
      );
    });
  }

  render() {
    return <div className="Players">{this.createPlayers()}</div>;
  }
}

export default MatchPlayers;
