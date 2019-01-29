/* eslint-env browser */
import React from 'react';
import { Route, Router } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import history from './history';
import './App.css';


const App = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Index" component={Index} />
    </div>
  </Router>
);

export default App;
