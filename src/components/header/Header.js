import React, { useState } from 'react';
import './Header.scss';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
const Header = props => {
  const [activeSearch, setActiveSearch] = useState(false);

  const handleInputClick = () => {
    setActiveSearch(!activeSearch);
  };

  let searchClass = 'header__search';
  if (activeSearch) searchClass += ' header__search_active';
  return (
    <div className="header">
      <div className="header__logo">Lanes.gg</div>
      <div className={searchClass}>
        <div className="header__search-region">
          <span>NA</span>
          <FiChevronDown />
        </div>
        <form className="header__search-form">
          <input
            className="header__search-input"
            // Need to fix this
            // ref={node => (this.search = node)}
            onClick={handleInputClick}
            type="text"
            placeholder="Username"
          />
          <FiSearch className="header__search-icon" />
        </form>
      </div>
    </div>
  );
};

export default Header;
