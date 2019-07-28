import React, { Component } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Expand.scss';

class Expand extends Component {
  state = {};

  render() {
    let expansionStyle = 'match__expansion';
    if (this.props.win) expansionStyle += ' match__expansion_win';
    else expansionStyle += ' match__expansion_lose';
    return (
      <div className={expansionStyle} onClick={() => this.props.handleExpand()}>
        <FiChevronDown />
      </div>
    );
  }
}

export default Expand;
