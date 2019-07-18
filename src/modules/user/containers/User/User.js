import React, { Component } from 'react';
import './User.scss';
import { connect } from 'react-redux';
import Header from '../../../../components/header';
import { getMatches } from '../../selectors';
import { getUserDetails } from '../../actions';
import Matches from '../../../matches/containers/Matches';
class User extends Component {
  componentDidMount() {
    this.props.getUserDetails();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">
          <div className="left"></div>
          <div className="right">
            <Matches />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: getMatches(state)
  };
};

export default connect(
  mapStateToProps,
  { getUserDetails }
)(User);
