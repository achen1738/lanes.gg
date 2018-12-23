import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./navBar";
import SearchArea from "./searchArea";
import NavSearch from "./navBarSearch";
import Body from "./body";
class Home extends Component {
  state = {};

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
        <div class="main orig-dark-mc">
          <NavSearch />
          <Body />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
