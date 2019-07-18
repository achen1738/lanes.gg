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

    // LIKE MERGING K NUMER OF ARRAYS BASED ON TIMESTAMP
    // HOWEVER I COULDNT FIND A PRIORITY QUEUE LIBRARY
    while ((i < soldLen || j < purchasedLen || k < undoLen) && z < 100) {
      var earliestItem = null;
      var earliestTime = Number.POSITIVE_INFINITY;
      var soldItem = null,
        purchItem = null,
        undoItem = null;
      // If we did not look at all elements in an item array already
      // set its respective item to a value in the array
      if (i < soldLen) soldItem = sold[i];
      if (j < purchasedLen) purchItem = purchased[j];
      if (k < undoLen) undoItem = undo[k];

      // For each of the previously set items, as long as they are not null
      // or undefined, do a simple comparison to keep track of the
      // earliest timestamp and its repective item.
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

      // This is to initialize the timestamp for the first group
      if (currentGroupTimestamp === null)
        currentGroupTimestamp = earliestItem.timestamp;

      if (earliestItem !== null && typeof earliestItem !== "undefined") {
        if (earliestItem.type === "ITEM_SOLD") i++;
        else if (earliestItem.type === "ITEM_PURCHASED") j++;
        else if (earliestItem.type === "ITEM_UNDO") k++;
      }

      // Put all items that were bought/sold/undo'ed within 15 seconds of each other
      // into a single group
      if (earliestItem.timestamp < currentGroupTimestamp + 15000) {
        if (earliestItem.type === "ITEM_UNDO") subArr.pop();
        else subArr.push(earliestItem);
      } else {
        // If the current item is not within 15 seconds of the previous, then
        // push the group of items into an array, and create a new array
        // containing just the current item. Also update the groups timestamp
        // to be the current items timestamp
        allItems.push(subArr);
        subArr = [earliestItem];
        currentGroupTimestamp = earliestItem.timestamp;
      }

      // If we looksed at all the elements of every array, push the final
      // group into the array of all items.
      if (i >= soldLen && j >= purchasedLen && k >= undoLen) {
        allItems.push(subArr);
      }

      // A counter just to make sure I dont go into an infinite loop.
      z++;
    }
    return allItems;
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
