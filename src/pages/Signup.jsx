/* eslint-env browser */
import React from 'react';

const Signup = () => (
  <div className="Signup">
    <div className="wrapper">
      <form className="form-signup">
        <h2 className="form-signup-heading">Signup</h2>
        <input type="text" className="form-control" name="userID" placeholder="User ID" required="" />
        <input type="password" className="form-control" name="password" placeholder="password" required="" />
        <input type="email" className="form-control" name="email" placeholder="E-mail" required="" />
        <input type="text" className="form-control" name="nickname" placeholder="nickname" required="" />
        <input type="text" className="form-control" name="phone" placeholder="phone" required="" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sing Up</button>
      </form>
    </div>
  </div>
);

export default Signup;
