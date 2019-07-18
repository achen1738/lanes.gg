import React, { Component } from 'react';
import './Header.scss';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
class Header extends Component {
  state = {
    activeSearch: false
  };

  handleSubmit = () => {};

  handleInputClick = () => {
    this.setState({ activeSearch: !this.state.activeSearch });
  };

  render() {
    let searchClass = 'header__search';
    if (this.state.activeSearch) searchClass += ' header__search_active';
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
              ref={node => (this.search = node)}
              onClick={() => this.handleInputClick()}
              type="text"
              placeholder="Username"
            />
            <FiSearch className="header__search-icon" />
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
