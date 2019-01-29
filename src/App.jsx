/* eslint-env browser */
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import history from './history';


import './App.css';


const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Login} />
      <Switch>
        <Route path="/Signup" component={Signup} />
      </Switch>
    </div>
  </Router>
);

export default App;
