/* eslint-env browser */
import React, { Component } from 'react';
import axios from 'axios';

const Console = console;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: '',
      email: '',
      nickname: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
  }

  onClickSignup() {
    const { state } = this;
    Console.log({ state });
    const user = {
      userID: state.userID,
      password: state.password,
      email: state.email,
      nickname: state.nickname,
      phone: state.phone,
    };
    Console.log(user);
    axios.post('/api/user/signup', { user })
      .then((res) => {
        Console.log(res);
        Console.log(res.data);
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
      <div className="Signup">
        <div className="wrapper">
          <form className="form-signup">
            <h2 className="form-signup-heading">Signup</h2>
            <input type="text" className="form-control" name="userID" value={state.userID} placeholder="User ID" required="" onChange={this.handleChange} />
            <input type="password" className="form-control" name="password" value={state.password} placeholder="password" required="" onChange={this.handleChange} />
            <input type="email" className="form-control" name="email" value={state.email} placeholder="E-mail" required="" onChange={this.handleChange} />
            <input type="text" className="form-control" name="nickname" value={state.nickname} placeholder="nickname" required="" onChange={this.handleChange} />
            <input type="text" className="form-control" name="phone" value={state.phone} placeholder="phone" required="" onChange={this.handleChange} />
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.onClickSignup}> Sing Up</button>
          </form>
        </div>
      </div>
    );
  }
}
