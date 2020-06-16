import React, { useState } from "react";
import axios from "axios";

export default function ExpensesTable({
  users,
  setUsers,
  userId,
  exportPassword,
}) {
  const [total, setTotoal] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expensesName, setExpensesName] = useState("");
  const [expensesAmount, setExpensesAmount] = useState(0);
  let tempTotal = 0;

  const addToList = () => {
    if (expensesName === "") {
      alert("Field Can't be left blank");
    } else {
      users.map(async (user) => {
        if (user._id === userId) {
          expenses.push({ name: expensesName, amount: expensesAmount });
          setExpensesName("");
          setExpensesAmount(0);
          await axios
            .put("/accounts/" + userId, {
              expenses: [...expenses, ...user.expenses],
              password: exportPassword,
              savings: [...user.savings],
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              alert(
                "There Was An Error While Trying To Upload To The Database"
              );
            });

          setExpenses([]);

          await axios
            .get("/accounts")
            .then((res) => {
              setUsers(res.data);
              // user.expenses.map((expense) => {
              //   tempTotal = tempTotal + expense.amount;
              //   setTotoal(tempTotal);
              // });
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  const deleteFromList = (id) => {
    console.log(id);
    users.map(async (user) => {
      if (user._id === userId) {
        let tempExpenses = user.expenses.filter((item) => item._id !== id);
        await axios.put("/accounts/" + userId, {
          expenses: [...tempExpenses],
          password: exportPassword,
          savings: [...user.savings],
        });
      }
      await axios
        .get("/accounts")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    });
  };

  const clearList = () => {
    users.map(async (user) => {
      if (user._id === userId) {
        setExpensesName("");
        setExpensesAmount(0);
        setExpenses([]);
        setTotoal(0);
        //tempTotal = 0;
        await axios
          .put("/accounts/" + userId, {
            expenses: [],
            password: exportPassword,
            savings: [...user.savings],
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
      {/* Expenses */}
      <table className="table table-danger">
        <thead>
          <tr>
            <th scope="col" className="lead">
              Expense
            </th>
            <th scope="col" className="lead">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <input
                className="form-control-calc"
                type="text"
                value={expensesName}
                onChange={(e) => setExpensesName(e.target.value)}
              />
            </th>
            <td>
              <input
                type="number"
                className="form-control-calc"
                value={expensesAmount}
                onChange={(e) => setExpensesAmount(e.target.value)}
                required
              />
            </td>
            <td>
              <button className="fas fa-plus btn" onClick={addToList}></button>
            </td>
          </tr>
          {users.map((user) => {
            if (user._id === userId) {
              return user.expenses === [] || user.expenses === null ? (
                <tr>
                  <th scope="row">Enter Expense Title</th>
                  <td>Enter Expense Amount</td>
                </tr>
              ) : (
                user.expenses.map((expense, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{expense.name}</th>
                      <td>${expense.amount}</td>
                      <td>
                        <button
                          className="fas fa-minus btn"
                          onClick={() => deleteFromList(expense._id)}
                        ></button>
                      </td>
                    </tr>
                  );
                })
              );
            }
          })}
          <tr>
            <th scope="row">Total: </th>
            <td>${total}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" className="btn btn-danger mb-5" onClick={clearList}>
        Clear All
      </button>
      {/* End of Expenses */}
    </div>
  );
}
