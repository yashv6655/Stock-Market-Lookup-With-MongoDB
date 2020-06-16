import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useEffect } from "react";

let userId = "";
let exportPassword = "";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("/accounts")
      .then((res) => {
        setUser(res.data);
        user.map((item) => {
          bcrypt.compare(password, item.password, function (err, res) {
            if (res) {
              userId = item._id;
              exportPassword = password;
              setLoggedIn(true);
              console.log("success");
            } else {
              console.log("failed");
              setLoggedIn(false);
            }
          });
        });
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // user.map((item) => {
    //   if (item.email === email && item.password === password) {
    //     console.log("Success");
    //     setLoggedIn(true);
    //     return loggedIn;
    //   } else {
    //     console.log("Failed");
    //     setLoggedIn(false);
    //     return loggedIn;
    //   }
    // });
  };

  useEffect(() => {
    return () => {
      console.log("cleaned");
    };
  }, []);

  return (
    <div>
      <div className="login-box">
        <h2>Log In</h2>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Log In</label>
            <input
              type="email"
              className="form-control"
              //id="formGroupExampleInput2"
              placeholder="Email"
              onChange={emailChange}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Password</label>
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
          {loggedIn ? (
            <Redirect to="/finance" />
          ) : (
            <p className="text-white">Please Log In</p>
          )}
        </form>
        <div className="text-center">
          <Link to="/signup" className="text-white">
            Signup
          </Link>
          <Link to="/forgotpassword" className="text-white ml-5">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export { userId, exportPassword };
