/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Console = console;

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.onClickAuthentication = this.onClickAuthentication.bind(this);
  }

  onClickAuthentication() {
    const { props } = this;
    const { match } = props;
    const { params } = match;
    const { token } = params;
    Console.log(token);
    axios.post('/api/auth', { token })
      .then((res) => {
        Console.log(res);
        Console.log(res.data);
      });
  }

  render() {
    return (
      <div className="Signup">
        <div className="wrapper">
          <form className="form-signup">
            <h2 className="form-signup-heading">
              Authentication
            </h2>
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.onClickAuthentication}> Verify </button>
          </form>
        </div>
      </div>
    );
  }
}

Authentication.defaultProps = {
  params: PropTypes.shape({
    token: PropTypes.string,
  }),
};
