import React from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import User from '../../../user/containers/User/User';

const App = props => {
  return (
    <Switch>
      <Redirect exact from="/" to="/summoner/born to kill 200" />
      <Route path="/summoner/:username" render={() => <User />} />
    </Switch>
  );
};

export default withCookies(withRouter(App));
