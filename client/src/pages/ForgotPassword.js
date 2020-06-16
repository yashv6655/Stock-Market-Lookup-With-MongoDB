import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/accounts")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const userIdChange = (e) => {
    setUserId(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordCheck = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const changePassword = () => {
    if (passwordCheck()) {
      users.map((user) => {
        if (userId === user._id) {
          axios
            .put("http://localhost:4000/accounts/" + userId, {
              password: password,
            })
            .then((res) => {
              console.log(res);
              alert("Successfully changed your passoword");
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  return (
    <div>
      <div className="login-box">
        <h2>Forgot Password</h2>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">User ID</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Username"
              onChange={userIdChange}
              value={userId}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Password"
              onChange={passwordChange}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Confirm Password"
              onChange={confirmPasswordChange}
              value={confirmPassword}
              required
            />
          </div>
          <button className="btn btn-primary" onClick={changePassword}>
            Change Password
          </button>
        </form>
        <Link to="/login" className="text-white">
          Back To Login
        </Link>
      </div>
    </div>
  );
}
