import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";

export default function ExpensesTable({
  users,
  setUsers,
  userId,
  exportPassword,
}) {
  const [total, setTotoal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expensesName, setExpensesName] = useState("");
  const [expensesAmount, setExpensesAmount] = useState(0);

  const updateExpenses = async () => {
    //console.log(expenses);
    let tempTotal = 0;
    await axios.get("/accounts").then((res) => {
      setUsers(res.data);
      users.map((user) => {
        if (user._id === userId) {
          user.expenses.map((expense) => {
            tempTotal +=
              parseFloat(expense.amount) + parseFloat(expenses[0].amount);
            setTotoal(tempTotal);
          });
        }
      });
    });
    return tempTotal;
  };

  const subtractExpenses = async (id) => {
    //console.log(expenses);
    let tempTotal = 0;

    await axios.get("/accounts").then((res) => {
      setUsers(res.data);
      users.map((user) => {
        if (user._id === userId) {
          user.expenses.map((expense) => {
            if (expense._id === id) {
              let temp = expense.amount;
              tempTotal = total - temp;
              setTotoal(tempTotal);
            }
          });
        }
      });
    });
    return tempTotal;
  };

  useEffect(() => {
    updateExpenses();
  }, []);

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
              stocks: [...user.stocks],
            })
            .then((res) => {
              //console.log(res);
            })
            .catch((err) => {
              console.log(err);
              alert(
                "There Was An Error While Trying To Upload To The Database"
              );
            });

          //To avoid duplication of data
          setExpenses([]);

          await axios
            .get("/accounts")
            .then((res) => {
              setUsers(res.data);
              updateExpenses();
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  const deleteFromList = (id) => {
    //console.log(id);
    users.map(async (user) => {
      if (user._id === userId) {
        subtractExpenses(id);
        let tempExpenses = user.expenses.filter((item) => item._id !== id);
        await axios.put("/accounts/" + userId, {
          expenses: [...tempExpenses],
          password: exportPassword,
          savings: [...user.savings],
          stocks: [...user.stocks],
        });
      }
      await axios
        .get("/accounts")
        .then((res) => {
          setUsers(res.data);
          // updateExpenses();
        })
        .catch((err) => console.log(err));
    });
  };

  const clearList = () => {
    users.map(async (user) => {
      if (user._id === userId) {
        setExpensesName("");
        setExpensesAmount(0);
        setExpenses([]);
        setTotoal([]);
        await axios
          .put("/accounts/" + userId, {
            expenses: [],
            password: exportPassword,
            savings: [...user.savings],
            stocks: [...user.stocks],
          })
          .then((res) => {
            //console.log(res)
          })
          .catch((err) => console.log(err));
        await axios
          .get("/accounts")
          .then((res) => {
            setUsers(res.data);
            //updateExpenses();
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
