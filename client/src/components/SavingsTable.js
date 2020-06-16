import React, { useState } from "react";
import axios from "axios";

export default function SavingsTable({
  users,
  setUsers,
  userId,
  exportPassword,
}) {
  //Savings Properties
  const [savings, setSavings] = useState([]);
  const [savingsName, setSavingsName] = useState([]);
  const [savingsAmount, setSavingsAmount] = useState([]);

  const clearList = () => {
    users.map(async (user) => {
      if (user._id === userId) {
        setSavingsName("");
        setSavingsAmount(0);
        setSavings([]);
        //setTotoal(0);
        //tempTotal = 0;
        await axios
          .put("/accounts/" + userId, {
            expenses: [...user.expenses],
            password: exportPassword,
            savings: [],
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        await axios
          .get("/accounts")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="col-sm">
      {/* Savings */}
      <table className="table table-success">
        <thead>
          <tr>
            <th scope="col" className="lead">
              Savings
            </th>
            <th scope="col" className="lead">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <input className="form-control-calc" />
            </th>
            <td>Mark</td>
            <td>
              <button className="fas fa-plus btn"></button>
            </td>
          </tr>
          {users.map((user, index) => {
            if (user._id === userId) {
              return user.savings === null ? (
                <tr key={index}>
                  <th scope="row">Enter Expense Title</th>
                  <td>Enter Expense Amount</td>
                </tr>
              ) : (
                user.savings.map((saving, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{saving.name}</th>
                      <td>{saving.amount}</td>
                      <td>
                        <button className="fas fa-minus btn"></button>
                      </td>
                    </tr>
                  );
                })
              );
            }
          })}
          <tr>
            <th scope="row">Total: </th>
            <td>1111111111</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-success mb-5"
        onClick={clearList}
      >
        Clear All
      </button>
      {/* End of Savings */}
    </div>
  );
}
