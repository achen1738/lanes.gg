import React, { Component } from "react";
import BlankSkills from "./blankSkills";

class BuildSkills extends Component {
  state = { champJSON: {}, nums: [] };

  async componentDidMount() {
    const champName = this.props[
      this.props.matches[this.props.index].championID
    ].id;
    const resp = await fetch(this.props.champJSON + champName + ".json");
    const champJSON = await resp.json();
    const nums = [0, 1, 2, 3];
    this.setState({ champJSON, nums });
  }

  // objectIsEmpty(obj) {
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key)) return false;
  //   }
  //   return true;
  // }

  createSkills(key) {
    const champName = this.props[
      this.props.matches[this.props.index].championID
    ].id;
    // This looked dumb when I started off, but the numbers are actually useful lmao
    const eighteen = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17
    ];
    const skills = this.props.timeline.data[key].SKILL_LEVEL_UP;
    const skillsLen = skills.length;
    if (this.state.nums.length === 0) {
      return <BlankSkills />;
    } else {
      return this.state.nums.map(num => {
        const spellsArray = this.state.champJSON.data[champName].spells;
        return (
          <tr key={spellsArray[num].id}>
            <td className="skillName">
              <img
                className="skillImg"
                alt="Skill!"
                src={this.props.spellURL + spellsArray[num].image.full}
              />
            </td>
            {eighteen.map(idx => {
              if (idx < skillsLen && skills[idx].skillSlot === num + 1)
                return (
                  <td key={idx} className="number activeCell">
                    {idx + 1}
                  </td>
                );
              return <td key={idx} className="number" />;
            })}
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div className="skillsWrapper">
        <div
          className={
            "sectionHeader " + (this.props.match.win === 0 ? "won" : "lost")
          }
        >
          Skills
        </div>
        <div
          className={
            "skillsContent contentColor " +
            (this.props.match.win === 0 ? "won" : "lost")
          }
        >
          <table>
            <tbody>{this.createSkills(this.props.index)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BuildSkills;
