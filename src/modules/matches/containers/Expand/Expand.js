import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Expand.scss';

const Expand = props => {
  let expansionStyle = 'match__expansion';
  if (props.win) expansionStyle += ' match__expansion_win';
  else expansionStyle += ' match__expansion_lose';
  return (
    <div className={expansionStyle} onClick={() => props.handleExpand()}>
      <FiChevronDown />
    </div>
  );
};

export default Expand;
