/* eslint-env browser */
import React, { Component } from 'react';
import axios from 'axios';

import history from '../history';

const Console = console;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin() {
    const { state } = this;
    const user = {
      userID: state.userID,
      password: state.password,
    };
    axios.post('/api/user/login', { user })
      .then((res) => {
        Console.log(res);
        Console.log(res.data);
        if (res.data.return === 'success') {
          history.push('/index');
        } else {
          alert('THINKING AGAIN');
        }
      });
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { state } = this;
    return (
      <div className="Login">
        <div className="wrapper">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please Login</h2>
            <input type="text" className="form-control" name="userID" value={state.userID} placeholder="User ID" onChange={this.handleChange} required="" />
            <input type="password" className="form-control" name="password" value={state.password} placeholder="Password" onChange={this.handleChange} required="" />
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.onClickLogin}>Login</button>
          </form>
          <a className="btn btn-lg btn-primary btn-block" href="signup">Signup</a>
        </div>
      </div>
    );
  }
}
