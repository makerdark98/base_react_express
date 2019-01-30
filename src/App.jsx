/* eslint-env browser */
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import Index from './pages/Index';
import history from './history';
import './App.css';


const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Auth/:token" component={Auth} />
      <Route path="/Index" component={Index} />
    </Switch>
  </Router>
);

export default App;
