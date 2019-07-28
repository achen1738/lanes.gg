import React from 'react';
import './OptionTab.scss';

const OptionTab = ({ value, index, setActiveIndex }) => {
  return (
    <div onClick={() => setActiveIndex(index)} className="expansion__tab">
      {value}
    </div>
  );
};
export default OptionTab;
