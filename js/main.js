import 'babel-polyfill';
import React from 'react';
import Relay from 'react-relay';
import { render } from 'react-dom';
import { applyRouterMiddleware, Route, hashHistory, IndexRedirect, Router } from 'react-router';
import useRelay from 'react-router-relay';

import App from './views/container/App';

import LoginView from './views/login/LoginView';
import LogoutView from './views/login/LogoutView'
import CreateUserView from './views/user/CreateUserView';
import WelcomeView from './views/welcome/WelcomeView';
import CreateMemoir from './views/memoir/CreateMemoir';
import ViewMemoir from './views/memoir/ViewMemoir';
import NotFound from './views/common/404';

const checkAuth = (variables, replace) => {
  if (localStorage.getItem('token')
    && localStorage.getItem('loggedIn')
    && localStorage.getItem('userName')
    && variables.routes.length === 1
    && variables.routes[0].path === '/') {
    replace({ pathname: '/welcome' });
  }
  if (!localStorage.getItem('token')) replace({ pathname: '/login' });
};

export function routeQuery() {
  return {
    viewer: () => Relay.QL`query RootQuery { viewer }`,
  };
}

const memoirParams = (params, { location }) => {
  const { memoirId } = location.query;
  return {
    ...params,
    memoirId,
  };
};

const routes = (
  <Router
    history={hashHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path="/" onEnter={checkAuth} />
    <Route path="/create" component={CreateUserView} queries={routeQuery()} />
    <Route path="/login" component={LoginView} queries={routeQuery()} />
    <Route path="/logout" component={LogoutView} queries={routeQuery()} />
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />
      <Route
        path="/welcome"
        component={WelcomeView}
        queries={routeQuery()}
        onEnter={checkAuth}
      />
      <Route
        path="/memoir"
        component={CreateMemoir}
        queries={routeQuery()}
        onEnter={checkAuth}
      />
      <Route
        path="/memoir/view"
        component={ViewMemoir}
        queries={routeQuery()}
        onEnter={checkAuth}
        prepareParams={memoirParams}
      />
    </Route>
    <Route path="/*" component={NotFound} />
  </Router>
);

render(routes, document.getElementById('root'));
