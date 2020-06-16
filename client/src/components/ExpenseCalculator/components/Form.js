import React from "react";
import { MdSend } from "react-icons/md";

export default function Form({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            className="form-control-calc"
            id="charge"
            name="charge"
            placeholder="Rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
      </div>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control-calc"
            id="amount"
            name="amount"
            placeholder="$2300"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn-calc">
        {edit ? "Edit" : "Enter"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
}
