import React, { Component } from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Home from '../../../home/containers/Home';
import User from '../../../user/containers/User';

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/summoner/me minh nguyen" />
        <Route path="/summoner/:username" component={User} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }
}

export default withCookies(withRouter(App));
