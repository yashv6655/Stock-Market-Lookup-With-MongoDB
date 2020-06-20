import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light mb-5"
      style={{ backgroundColor: "#fb5724" }}
    >
      <Link className="navbar-brand title-nav mr-5" to="/">
        Stock Lookup
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link
            className="nav-link mx-2"
            to="/"
            style={{ fontSize: "1.35rem" }}
          >
            Home
          </Link>
          <Link
            className="nav-link mx-2"
            to="/learnmore"
            style={{ fontSize: "1.35rem" }}
          >
            Learn More
          </Link>
          <Link
            className="nav-link mx-2"
            to="/login"
            style={{ fontSize: "1.35rem" }}
          >
            Login/Signup For An Income Porfolio
          </Link>
          <Link
            className="nav-link mx-2"
            to="/calculator"
            style={{ fontSize: "1.35rem" }}
          >
            Budget Calculator
          </Link>
        </div>
      </div>
    </nav>
  );
}
