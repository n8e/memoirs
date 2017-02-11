import 'babel-polyfill';
import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';
import { applyRouterMiddleware, Route, hashHistory, IndexRedirect, Router } from 'react-router';
import useRelay from 'react-router-relay';

import App from './views/container/App';

import LoginView from './views/login/LoginView';
import CreateUserView from './views/user/CreateUserView';
import WelcomeView from './views/welcome/WelcomeView';

export function routeQuery() {
  return {
    viewer: () => Relay.QL`query RootQuery { viewer }`,
  };
}

const routes = (
  <Router history={hashHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
      <Route path="/create" component={CreateUserView} queries={routeQuery()} />
      <Route path="/login" component={LoginView} queries={routeQuery()} />
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/welcome" component={WelcomeView} queries={routeQuery()} />
      </Route>
  </Router>
)

render(routes, document.getElementById('root'));
