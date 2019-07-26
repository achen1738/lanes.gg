import React, { Component } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Expansion.scss';

class Expansion extends Component {
  state = {};
  render() {
    let expansionStyle = 'match__expansion';
    if (this.props.win) expansionStyle += ' match__expansion_win';
    else expansionStyle += ' match__expansion_lose';
    return (
      <div className={expansionStyle}>
        <FiChevronDown />
      </div>
    );
  }
}

export default Expansion;
