import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Clock from './clock';
import History from './history';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route
              path="/history"
              component={History}
              {...this.props}
            />
            <Route
              path="/"
              component={Clock}
              {...this.props}
            />
          </Switch>
      </Router>
    );
  }
}

export default (App);
