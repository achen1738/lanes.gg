import React, { Component } from "react";
import "./../../css/match.css";
import MatchSpells from "./matchSpells";
import MatchInfo from "./matchInfo";
import MatchKDA from "./matchKDA";
import MatchItems from "./matchItems";
import MatchPlayers from "./matchPlayers";
import Details from "./../expanded/details";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      allMatches: {},
      expanded: {}
    };
  }
  async componentDidMount() {
    const username = window.location.search.substring(10);
    const resp = await fetch("http://localhost:5000/matches/" + username);
    const matchObj = await resp.json();
    const matches = matchObj.matches;
    const allMatches = matchObj.allMatches;
    var expanded = {};
    console.log(matches);
    matches.forEach(match => {
      expanded[match.matchID] = false;
    });
    console.log(allMatches);
    this.setState({ matches, allMatches, expanded });
  }

  async expand(e) {
    var expanded = this.state.expanded;
    const matchID = e.currentTarget.getAttribute("matchid");
    expanded[matchID] = !expanded[matchID];
    this.setState({ expanded });
  }

  createMatches() {
    return this.state.matches.map(match => {
      // console.log(this.state.allMatches);
      return (
        <div
          key={match.matchID}
          className="matchItem"
          data-match-id={match.matchID}
        >
          <div className={(match.win === 0 ? "Win" : "Loss") + " container"}>
            <MatchSpells {...this.props} match={match} />
            <MatchInfo
              {...this.props}
              queue={this.state.allMatches[match.matchID].queue}
              match={match}
            />
            <MatchKDA {...this.props} match={match} />
            <MatchItems {...this.props} match={match} />
            <MatchPlayers
              {...this.props}
              matches={this.state.allMatches[match.matchID].matches}
            />
            <div
              matchid={match.matchID}
              className="Button"
              onClick={e => this.expand(e)}
            >
              <div
                matchid={match.matchID}
                className="Arrow"
                onClick={e => this.expand(e)}
              />
            </div>
          </div>
          <div className={"detailsContainer"}>
            {this.state.expanded[match.matchID] ? (
              <Details
                {...this.props}
                match={match}
                matches={this.state.allMatches[match.matchID].matches}
              />
            ) : null}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="matchList">{this.createMatches()}</div>;
  }
}

export default MatchList;
