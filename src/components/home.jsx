import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// sad
import Nav from "./navBar";
import SearchArea from "./searchArea";
import NavSearch from "./navBarSearch";
import Body from "./body";
class Home extends Component {
  state = {};

  async initializeChamps() {
    const version = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );

    const versionJSON = await version.json();

    const champ = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${
        versionJSON[0]
      }/data/en_US/champion.json`
    );

    const runes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${
        versionJSON[0]
      }/data/en_US/runesReforged.json`
    );
    const summonerSpells = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${
        versionJSON[0]
      }/data/en_US/summoner.json`
    );

    const runesJSON = await runes.json();
    const summonerSpellsJSON = await summonerSpells.json();
    const champJSON = await champ.json();

    var myChampObject = {};
    const data = champJSON.data;

    var subObject, value;

    /* Take the champJSON file and trim it to just keep the name, id, and image object */
    Object.keys(data).forEach(function(key, index) {
      value = data[key];
      subObject = { image: value.image, id: value.id, name: value.name };
      myChampObject[value.key] = subObject;
    });
    myChampObject["version"] = versionJSON[0];
    myChampObject["spellURL"] = `http://ddragon.leagueoflegends.com/cdn/${
      versionJSON[0]
    }/img/spell/`;
    myChampObject["runeURL"] = `https://ddragon.leagueoflegends.com/cdn/img/`;
    myChampObject["runes"] = runesJSON;
    myChampObject["summonerSpells"] = summonerSpellsJSON;
    myChampObject["itemURL"] = `http://ddragon.leagueoflegends.com/cdn/${
      versionJSON[0]
    }/img/item/`;
    myChampObject["champURL"] = `http://ddragon.leagueoflegends.com/cdn/${
      versionJSON[0]
    }/img/champion/`;
    myChampObject["champJSON"] = `https://ddragon.leagueoflegends.com/cdn/${
      versionJSON[0]
    }/data/en_US/champion/`;
    return myChampObject;
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <div class="main dark-mc">
                  <Nav />
                  <SearchArea />
                </div>
              </React.Fragment>
            )}
          />
          <Route path="/lol/summoner/" render={() => this.main()} />
        </React.Fragment>
      </BrowserRouter>
    );
  }

  main() {
    return (
      <React.Fragment>
        <div className="main orig-dark-mc">
          <NavSearch />
          <Body champs={this.initializeChamps()} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
