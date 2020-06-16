import React from "react";
import { userId } from "./LoginForm";

export default function Success() {
  return (
    <div>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>PLEASE READ BEFORE CLOSING</strong> Store this user ID in a safe
        location in order to reset your password.
        <strong>
          {" "}
          User ID: <kbd>{userId}</kbd>
        </strong>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="jumbotron">Logged In {userId}</div>
    </div>
  );
}
