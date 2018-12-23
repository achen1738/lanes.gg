import React, { Component } from "react";
class SummonerInfo extends Component {
  constructor() {
    super();
    this.state = {
      leagues: []
    };
  }

  async componentDidMount() {
    const username = window.location.search.substring(10);

    var res = await fetch("http://localhost:5000/leagues/" + username);
    const leagues = await res.json();
    this.setState({ leagues });
    console.log(this.state.leagues);
    // this.setState({ res });
    // console.log(res);
    //   .then(res => res.json())
    //   .then(leagues =>
    //     this.setState({ leagues }, () => {
    //       console.log(leagues);
    //     })
    //   );
  }

  getSummonerInfo() {
    return <h1>Hello</h1>;
  }

  render() {
    return (
      <div class="summonerInfo infoSize">
        <div class="summonerTier sBox">
          <div class="soloRank">
            <div class="tierMedal" />
            <div class="tierInfo">
              <div class="divLP" />
              <div class="winPercentage" />
              <div class="winLossGames" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SummonerInfo;
