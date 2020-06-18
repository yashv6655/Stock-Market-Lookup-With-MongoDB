import React from "react";

export default function Alert({ userId }) {
  return (
    <div>
      <div
        className="alert alert-danger alert-dismissible fade show mb-5"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>PLEASE READ BEFORE CLOSING.</strong> Store this user ID in a
        safe location in order to reset your password.
        <strong>
          {" "}
          User ID: <kbd className="mr-3">{userId}</kbd>
        </strong>
      </div>
      <div
        className="alert alert-info alert-dismissible fade show mb-5 text-info"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>PLEASE READ BEFORE CLOSING.</strong> Add Two Items Per Table To
        See Totals In Each Table
      </div>
    </div>
  );
}
