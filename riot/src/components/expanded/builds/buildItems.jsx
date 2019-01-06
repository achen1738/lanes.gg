import React, { Component } from "react";
import RedX from "../../../images/redX.png";
import "./../../../css/main_page.css";
class BuildItems extends Component {
  state = {};
  createItems(key) {
    const allItems = this.createSingleItemsArray(key);
    // console.log(allItems);
    const len = allItems.length;
    var counter = -1;
    return allItems.map(arr => {
      var time = null;
      if (arr.length !== 0) {
        const currentTimestamp = arr[0].timestamp;
        const mins = Math.floor(currentTimestamp / 1000 / 60);
        var seconds = Math.round((currentTimestamp / 1000) % 60);
        if (seconds.toString().length === 1) seconds = "0" + seconds;
        time = `${mins}:${seconds}`;
      }
      counter++;
      return (
        <li key={counter} className="Item">
          <ol key={counter} className="Items">
            {arr.map(item => {
              return (
                <li key={item.timestamp} className="Item">
                  <img
                    className={
                      "buildItem " + item.type === "ITEM_SOLD" ? "sold" : ""
                    }
                    src={this.props.itemURL + item.itemId + ".png"}
                    alt="Item!"
                  />
                  {item.type === "ITEM_SOLD" ? (
                    <img
                      className="itemRedX"
                      style={{ width: "10px", height: "10px" }}
                      src={RedX}
                      alt="Red X!"
                    />
                  ) : null}
                </li>
              );
            })}
            {time === null ? null : <div className="itemTime">{time}</div>}
          </ol>
          {counter !== len - 1 ? (
            <div className="arrowContainer">
              <div className="nextArrow">
                <i className="rightArrow" />
              </div>
            </div>
          ) : null}
        </li>
      );
    });
  }

  createSingleItemsArray(key) {
    // console.log(this.props.timeline);
    // console.log(key);
    const data = this.props.timeline.data[key];
    const sold = data.ITEM_SOLD;
    const purchased = data.ITEM_PURCHASED;
    const undo = data.ITEM_UNDO;
    const soldLen = sold.length;
    const purchasedLen = purchased.length;
    const undoLen = undo.length;
    var allItems = [];
    var subArr = [];
    var currentGroupTimestamp = null;
    var i = 0,
      j = 0,
      k = 0,
      z = 0;

    while ((i < soldLen || j < purchasedLen || k < undoLen) && z < 30) {
      var earliestItem = null;
      var earliestTime = Number.POSITIVE_INFINITY;
      var soldItem = null,
        purchItem = null,
        undoItem = null;
      if (i < soldLen) soldItem = sold[i];
      if (j < purchasedLen) purchItem = purchased[j];
      if (k < undoLen) undoItem = undo[k];

      if (soldItem !== null && typeof soldItem !== "undefined") {
        if (soldItem.timestamp < earliestTime) {
          earliestTime = soldItem.timestamp;
          earliestItem = soldItem;
        }
      }

      if (purchItem !== null && typeof purchItem !== "undefined") {
        if (purchItem.timestamp < earliestTime) {
          earliestTime = purchItem.timestamp;
          earliestItem = purchItem;
        }
      }

      if (undoItem !== null && typeof undoItem !== "undefined") {
        if (undoItem.timestamp < earliestTime) {
          earliestTime = undoItem.timestamp;
          earliestItem = undoItem;
        }
      }

      if (currentGroupTimestamp === null) {
        currentGroupTimestamp = earliestItem.timestamp;
      }

      // allItems.push(earliestItem);
      if (
        earliestItem !== null &&
        typeof earliestItem !== "undefined" &&
        earliestItem.type === "ITEM_SOLD"
      ) {
        i++;
      } else if (
        earliestItem !== null &&
        typeof earliestItem !== "undefined" &&
        earliestItem.type === "ITEM_PURCHASED"
      ) {
        j++;
      } else if (
        earliestItem !== null &&
        typeof earliestItem !== "undefined" &&
        earliestItem.type === "ITEM_UNDO"
      ) {
        k++;
      }

      if (earliestItem.timestamp < currentGroupTimestamp + 15000) {
        if (earliestItem.type === "ITEM_UNDO") {
          subArr.pop();
        } else {
          subArr.push(earliestItem);
        }
      } else {
        // console.log(currentGroupTimestamp, earliestItem.timestamp);
        allItems.push(subArr);
        subArr = [earliestItem];
        currentGroupTimestamp = earliestItem.timestamp;
      }

      if (i >= soldLen && j >= purchasedLen && k >= undoLen) {
        allItems.push(subArr);
      }
      z++;
    }
    return allItems;
    // console.log(allItems);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            "sectionHeader itemsHeader " +
            (this.props.match.win === 0 ? "won" : "lost")
          }
        >
          Items
        </div>
        <div
          className={
            "itemsContent contentColor " +
            (this.props.match.win === 0 ? "won" : "lost")
          }
        >
          <ul>{this.createItems(this.props.index)}</ul>
        </div>
      </React.Fragment>
    );
  }
}

export default BuildItems;
