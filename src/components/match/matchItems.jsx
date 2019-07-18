import React, { Component } from "react";
class MatchItems extends Component {
  state = {};

  createItems() {
    const match = this.props.match;
    var counter = 0;
    return match.items.map(item => {
      if (counter++ !== 6) {
        var number = item === 0 ? 3637 : item;
        return (
          <div key={`item${counter}`} className="Item">
            <img src={this.props.itemURL + number + ".png"} alt="Item!" />
          </div>
        );
      }
      return null;
    });
  }

  createTrinket() {
    const match = this.props.match;
    const item = match.items[6];
    var number = item === 0 ? 3637 : item;
    return (
      <div className="Item">
        <img src={this.props.itemURL + number + ".png"} alt="Item!" />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="ItemsList">{this.createItems()}</div>
        <div className="Trinket">{this.createTrinket()}</div>
      </React.Fragment>
    );
  }
}

export default MatchItems;
