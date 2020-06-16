import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordCheck()) {
      await axios
        .post("/accounts", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          alert("Success. Please Go The Login Page.");
        })
        .catch((err) => {
          console.log(err);
          alert("Error. Please Try Again");
        });
    } else {
      if (password.length < 7) alert("Password Isn't Secure enough");
      else alert("Passwords Don't Match");
      console.log("failed to signup");
    }
  };

  const passwordCheck = () => {
    if (
      password === confirmPassword &&
      password.length < 7 &&
      /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="text-white">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              onChange={emailChange}
              value={email}
            />
            <small id="emailHelp" className="form-text text-warning">
              We'll never share your information with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={passwordChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="text-white">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={confirmPasswordChange}
              value={confirmPassword}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        <Link to="/login" className="text-white mt-5">
          Back To Login
        </Link>
      </div>
    </div>
  );
}
