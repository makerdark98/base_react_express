/* eslint-env browser */
import React from 'react';

const Login = () => (
  <div className="Login">
    <div className="wrapper">
      <form className="form-signin">
        <h2 className="form-signin-heading">Please Login</h2>
        <input type="text" className="form-control" name="userID" placeholder="User ID" required="" />
        <input type="password" className="form-control" placeholder="Password" required="" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
      <a className="btn btn-lg btn-primary btn-block" href="signup">Signup</a>
    </div>
  </div>
);

export default Login;
