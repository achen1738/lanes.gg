import React, { Component } from "react";
import Domination from "./../../../images/backdrops/domination.jpeg";
import Inspiration from "./../../../images/backdrops/inspiration.jpeg";
import Resolve from "./../../../images/backdrops/resolve.jpeg";
import Precision from "./../../../images/backdrops/precision.jpeg";
import Sorcery from "./../../../images/backdrops/sorcery.jpeg";
import Health from "./../../../images/statPerks/health.png";
import AttackSpeed from "./../../../images/statPerks/as.png";
import MagicResist from "./../../../images/statPerks/mr.png";
import Armor from "./../../../images/statPerks/armor.png";
import Cooldown from "./../../../images/statPerks/cdr.png";
import Adaptive from "./../../../images/statPerks/adaptive.png";

class BuildRunes extends Component {
  state = { statPerks: {} };

  componentWillMount() {
    var statPerks = {
      5001: Health,
      5002: Armor,
      5003: MagicResist,
      5005: AttackSpeed,
      5007: Cooldown,
      5008: Adaptive
    };
    this.setState({ statPerks });
  }

  addPrimaryRunes(mainEnv) {
    console.log(this.props.runes);
    // I was a fucking idiot and im too lazy to change lmao
    const nums = [0, 1, 2, 3];
    const lmao = ["firstRune", "secondRune", "thirdRune", "fourthRune"];
    const match = this.props.matches[this.props.index];
    const primary = match.primaryTree;
    const tree = this.props.runes.find(obj => {
      return obj.id === match.primaryPerk;
    });
    const slots = tree.slots;
    return (
      <div className="mainTreeContainer">
        <div className="bigRelativeContainer">
          <div className="classRune mainTree">
            <div className="classRuneContainer">
              <img
                src={`https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/icon-${
                  mainEnv[1]
                }-36x36.png`}
                alt="Rune!"
              />
            </div>
            <svg className="classBorder">
              <circle
                className="classMoon moon-bottom"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${mainEnv[2]})`}
              />
              <circle
                className="classMoon moon-left"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${mainEnv[2]})`}
              />
              <circle
                className="classMoon moon-right"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${mainEnv[2]})`}
              />
            </svg>
            <svg className="classCircle">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                strokeWidth="3"
                stroke={`url(${mainEnv[3]})`}
              />
            </svg>
          </div>
          <div className="barThing">
            <div className="moreBarThing" />
          </div>
          {nums.map(num => {
            const rune = slots[num].runes.find(choice => {
              return choice.id === primary[num];
            });
            if (num === 0) {
              return (
                <div key={num} className="bigRune firstRune mainTree">
                  {/* <div className="bigRuneContainer"> */}
                  <img src={this.props.runeURL + rune.icon} alt="Big Rune!" />
                  {/* </div> */}
                </div>
              );
            } else {
              return (
                <div key={num} className={`smallRune ${lmao[num]} mainTree`}>
                  <div className="runeContainer">
                    <img src={this.props.runeURL + rune.icon} alt="Big Rune!" />
                  </div>
                  <svg
                    className="runesBorder"
                    height="40"
                    width="40"
                    version="1.1"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="19"
                      stroke={`url(${mainEnv[3]})`}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  addSecondaryRunes(secEnv) {
    const match = this.props.matches[this.props.index];
    const secondary = match.secondaryTree;
    const tree = this.props.runes.find(obj => {
      return obj.id === match.secondaryPerk;
    });
    const slots = tree.slots;
    const nums = [1, 2, 3];
    return (
      <div className="secondTreeContainer">
        <div className="bigRelativeContainer">
          <div className="secondClass mainTree">
            <div className="classRuneContainer">
              <img
                src={`https://d181w3hxxigzvh.cloudfront.net/wp-content/uploads/2017/09/icon-${
                  secEnv[1]
                }-36x36.png`}
                alt="Rune!"
              />
            </div>
            <svg className="classBorder">
              <circle
                className="classMoon moon-bottom"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${secEnv[2]})`}
              />
              <circle
                className="classMoon moon-left"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${secEnv[2]})`}
              />
              <circle
                className="classMoon moon-right"
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                strokeWidth="2"
                stroke={`url(${secEnv[2]})`}
              />
            </svg>
            <svg className="classCircle">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                strokeWidth="3"
                stroke={`url(${secEnv[3]})`}
              />
            </svg>
          </div>
          {nums.map(num => {
            const runes = slots[num].runes;
            const choice = runes.find(rune => {
              return rune.id === secondary[0] || rune.id === secondary[1];
            });
            if (typeof choice !== "undefined") {
              var location =
                choice.id === secondary[0] ? "erRune" : "secondRune";
              return (
                <div
                  key={num}
                  className={`secondarySmallRune ${location} mainTree`}
                >
                  <div className="runeContainer">
                    <img
                      src={this.props.runeURL + choice.icon}
                      alt="Big Rune!"
                    />
                  </div>
                  <svg
                    className="runesBorder"
                    height="40"
                    width="40"
                    version="1.1"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="19"
                      stroke={`url(${secEnv[3]})`}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }

  addTernaryRunes() {
    const classes = ["topStat", "midStat", "bottomStat"];
    const match = this.props.matches[this.props.index];
    const ternary = match.ternaryTree;
    var counter = -1;
    return (
      <div className="statRunes">
        <div className="smallRelativeContainer">
          <div className="thirdBar barContent">
            <div className="moreBarThing" />
          </div>
          <div className="fourthBar barContent">
            <div className="moreBarThing" />
          </div>
          {ternary.map(stat => {
            counter++;
            return (
              <div
                key={classes[counter]}
                className={"statRune " + classes[counter]}
              >
                <svg
                  className="statRuneBorder"
                  height="35"
                  width="35"
                  version="1.1"
                >
                  <circle
                    cx="15.75"
                    cy="16.25"
                    r="13.5"
                    className="statCircle"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <img src={this.state.statPerks[stat]} alt="Stat Rune!" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  createRunes() {
    const match = this.props.matches[this.props.index];
    const environmentDict = {
      8000: [
        Precision,
        "p",
        "#circle-gradient-precision",
        "#gradient-precision"
      ],
      8100: [
        Domination,
        "d",
        "#circle-gradient-domination",
        "#gradient-domination"
      ],
      8200: [Sorcery, "s", "#circle-gradient-sorcery", "#gradient-sorcery"],
      8300: [
        Inspiration,
        "i",
        "#circle-gradient-inspiration",
        "#gradient-inspiration"
      ],
      8400: [Resolve, "r", "#circle-gradient-resolve", "#gradient-resolve"]
    };
    const mainEnv = environmentDict[match.primaryPerk];
    var secEnv = environmentDict[match.secondaryPerk];
    return (
      <React.Fragment>
        {this.addPrimaryRunes(mainEnv)}
        {this.addSecondaryRunes(secEnv)}
        {this.addTernaryRunes()}
        <div className="backdrop">
          <img src={mainEnv[0]} alt="BackDrop!" />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="runesContent">
        {this.createRunes()}
        <div className="secondBar">
          <div className="moreBarThing" />
        </div>
      </div>
    );
  }
}

export default BuildRunes;
