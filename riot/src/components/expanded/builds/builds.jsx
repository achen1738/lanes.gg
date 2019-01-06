import React, { Component } from "react";
import BuildItems from "./buildItems";
import BuildSkills from "./buildSkills";
import BuildRunes from "./buildRunes";
// require("google-closure-library");
// goog.require("goog.structs.priorityqueue");

class Builds extends Component {
  state = {
    visible: {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    }
  };

  /**
   * Sets the visibility of all tabs to be false, however for the clicked element
   * its boolean value is just set to true. This way an element is always
   * visible, but only one at max is visible.
   * @param {*} index - index of the clicked element
   */
  setVisible(index) {
    var visible = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false
    };
    visible[index] = true;
    this.setState({ visible });
  }

  componentWillMount() {
    const index = this.props.matches.findIndex(match => {
      return match.username === this.props.match.username;
    });
    console.log(this.props.timeline);
    // Sets the visibility of the user's element to be visible
    this.setVisible(index);
  }

  expand(e) {
    const index = e.currentTarget.getAttribute("index");
    // Changes the visibility of the clicked element.
    this.setVisible(index);
  }

  createChampImgs() {
    var counter = -1;
    // console.log(this.state.visible);
    return this.props.matches.map(match => {
      counter++;
      return (
        <li
          onClick={e => this.expand(e)}
          key={match.username}
          index={counter}
          className={
            "buildTabLinks " +
            (this.state.visible[counter] ? "buildActive" : "")
          }
        >
          <img
            src={this.props.champURL + this.props[match.championID].image.full}
            alt="Champion!"
          />
        </li>
      );
    });
  }

  createBuilds() {
    return Object.keys(this.state.visible).map(key => {
      if (this.state.visible[key]) {
        return (
          <React.Fragment key={key}>
            <div
              className={
                "staticSize" + (this.props.match.win === 0 ? " won" : " lost")
              }
            >
              <ul
                className={
                  "buildTabs" +
                  (this.props.match.win === 0 ? " won blue" : " lost red")
                }
              >
                {this.createChampImgs()}
                {/* <svg className="champSVGWrap" width="699" height="75">
                  <rect
                    x="5"
                    y="5"
                    rx="35"
                    ry="92"
                    width="590"
                    height="63"
                    style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
                  />
                </svg> */}
              </ul>
              <div className="buildSkillsRunes">
                <BuildSkills {...this.props} index={key} />
                <BuildRunes {...this.props} index={key} />
              </div>
            </div>
            <BuildItems {...this.props} index={key} />
          </React.Fragment>
        );
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <div className="builds">
        <div className="buildsContent">{this.createBuilds()}</div>
      </div>
    );
  }
}

export default Builds;
