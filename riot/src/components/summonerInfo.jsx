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
    console.log(leagues);
    this.setState({ leagues });
  }

  createRankedSoloInfo() {
    var league = this.state.leagues.find(function(element) {
      return element.queueType === "RANKED_SOLO_5x5";
    });

    if (typeof league != "undefined") {
      var imgRank = this.rankImage(league.tier, league.rank);
      var winLoss = `${league.wins}W ${league.losses}L`;
      var winRatio =
        Math.ceil((league.wins / (league.wins + league.losses)) * 100) +
        "% Win Ratio";
      var rank = `${imgRank[1]} ${league.rank} ${league.leaguePoints} LP`;
      return (
        <div key={league.queueType} class="soloRank">
          <div class="tierMedal">
            <img src={imgRank[0]} alt="Summoner Rank" />
          </div>
          <div class="tierInfo">
            <div class="divLP">{rank}</div>
            <div class="winPercentage">{winRatio}</div>
            <div class="winLossGames">{winLoss}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div key="unranked" class="soloRank">
          <div class="tierMedal">
            <img
              src="http://opgg-static.akamaized.net/images/medals/default.png"
              alt="Default rank"
            />
          </div>
          <div class="tierInfo">
            <div class="divLP">
              <span>Unranked</span>
            </div>
          </div>
        </div>
      );
    }
  }

  createLeagueInfo() {
    return this.state.leagues.map(league => {
      var imgRank = this.rankImage(league.tier, league.rank);
      var winLoss = `${league.wins}W ${league.losses}L`;
      var winRatio =
        Math.ceil((league.wins / (league.wins + league.losses)) * 100) +
        "% Win Ratio";
      var rank = `${imgRank[1]} ${league.rank} ${league.leaguePoints} LP`;

      if (
        league.queueType === "RANKED_FLEX_TT" ||
        league.queueType === "RANKED_FLEX_SR"
      ) {
        const queueName =
          league.queueType === "RANKED_FLEX_TT"
            ? "Twisted Treeline"
            : "Ranked Flex";
        return (
          <div key={league.queueType} className="notSolo">
            <div className="tierMedal">
              <img src={imgRank[0]} alt="Summoner Rank" />
            </div>
            <div className="queueType">
              <div className="queueName">{queueName}</div>
              <div className="Rank">{rank}</div>
            </div>
            <div className="winLoss">
              <div className="winPercentage">{winRatio}</div>
              <div className="winLossGame">{winLoss}</div>
            </div>
          </div>
        );
      }
    });
  }

  /**
   * This function uses data acquired from Riot API and translates it to an image URL
   * regarding the rank medal, and the rank in string form.
   * @param {*} tier - rank acquired from Riot API.
   * @param {*} rank - division acquired from Riot API.
   */
  rankImage(tier, rank) {
    var div, mRank, imgURL;
    var divisions = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4
    };

    var tiers = {
      IRON: "Iron",
      BRONZE: "Bronze",
      SILVER: "Silver",
      GOLD: "Gold",
      PLATINUM: "Platinum",
      DIAMOND: "Diamond",
      MASTER: "Master",
      GRANDMASTER: "Grandmaster",
      CHALLENGER: "Challenger"
    };

    if (typeof tiers[tier] == "undefined") {
      mRank = "Unranked";
      imgURL = `http://opgg-static.akamaized.net/images/medals/default.png`;
    } else {
      mRank = tiers[tier];
      if (typeof divisions[rank] == "undefined") div = 1;
      else div = divisions[rank];
      imgURL = `http://opgg-static.akamaized.net/images/medals/${mRank.toLowerCase()}_${div}.png`;
    }

    return [imgURL, mRank];
  }

  render() {
    return (
      <div class="summonerInfo infoSize">
        <div class="summonerTier sBox">
          {this.createRankedSoloInfo()}
          {this.createLeagueInfo()}
        </div>
      </div>
    );
  }
}

export default SummonerInfo;
