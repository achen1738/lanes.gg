import React, { Component } from "react";
class MatchSpells extends Component {
  state = {};

  createSpells(match) {
    const champ = this.props[match.championID];
    var keystoneURL, secondaryURL, spell1URL, spell2URL;
    const runesObj = this.props.runes;
    const trees = Object.values(runesObj);
    const runeColors = {
      8000: "gradient-precision",
      8100: "gradient-domination",
      8200: "gradient-sorcery",
      8300: "gradient-inspiration",
      8400: "gradient-resolve"
    };
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
    // const imageURLs = [spell1URL, spell2URL, keystoneURL, secondaryURL];

    return (
      <div className="Spells">
        <div className="ChampName">{champ.name}</div>
        <div className="biggestBox">
          <div className="ChampImg">
            <img src={this.props.champURL + champ.image.full} alt="Champion!" />
          </div>
          <div className="Spell left">
            <img src={this.props.spellURL + spell1URL} alt="Summoner Spell!" />
          </div>
          <div className="Spell right">
            <img src={this.props.spellURL + spell2URL} alt="Summoner Spell!" />
          </div>
          <div className="MainTree">
            <img src={this.props.runeURL + keystoneURL} alt="Rune!" />
          </div>
          <div className="Secondary lowerImage">
            <img src={this.props.runeURL + secondaryURL} alt="Rune!" />
          </div>
          <div className="Level lowerImage">{match.champLevel}</div>
          <svg
            className="svgBorder left"
            height="26"
            width="26"
            version="1.1"
            style={{ top: "45%", zIndex: 2 }}
          >
            <circle
              cx="13"
              cy="13"
              r="12"
              stroke="#ededed"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <svg
            className="svgBorder"
            height="26"
            width="26"
            version="1.1"
            style={{ top: "45%", left: "41%", zIndex: 2 }}
          >
            <circle
              cx="13"
              cy="13"
              r="12"
              stroke="#ededed"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <svg
            className="svgBorder"
            height="30"
            width="30"
            version="1.1"
            style={{ top: "60%", right: "6%" }}
          >
            <circle
              cx="15"
              cy="15"
              r="14"
              stroke={`url(#${runeColors[match.primaryPerk]})`}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    );
  }

  render() {
    return <div className="Spells">{this.createSpells(this.props.match)}</div>;
  }
}

export default MatchSpells;
