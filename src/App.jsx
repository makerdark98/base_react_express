/* eslint-env browser */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './pages/Auth';

import './App.css';


const App = () => (
  <div>
    <Route exact path="/" component={Login} />
    <Switch>
      <Route path="/Signup" component={Signup} />
      <Route path="/Auth/:token" component={Auth} />
    </Switch>
  </div>
);

export default App;
