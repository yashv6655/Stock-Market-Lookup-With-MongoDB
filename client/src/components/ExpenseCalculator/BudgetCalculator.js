import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import List from "./components/List";
import Form from "./components/Form";
import uuid from "uuid/v4";
import { Link } from "react-router-dom";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1534 },
//   { id: uuid(), charge: "car", amount: 123 },
//   { id: uuid(), charge: "water", amount: 56 },
// ];

function BudgetCalculator({ title, localStorageTitle }) {
  //******************* state values *****************************//
  const initialExpenses = localStorage.getItem(localStorageTitle)
    ? JSON.parse(localStorage.getItem(localStorageTitle))
    : [];
  //all expenses
  const [expenses, setExpenses] = useState(initialExpenses);

  //individual expense
  const [charge, setCharge] = useState("");

  //individual amount
  const [amount, setAmount] = useState("");

  //alert
  const [alert, setAlert] = useState({ show: false });

  //edit
  const [edit, setEdit] = useState(false);

  //edit individual item
  const [id, setId] = useState(0);
  //******************* end of state values *****************************//

  //******************* useEffect *****************************//
  useEffect(() => {
    localStorage.setItem(localStorageTitle, JSON.stringify(expenses));
  }, [expenses]);
  //******************* end of useEffect *****************************//

  //******************* functions *****************************//
  const handleCharge = (event) => {
    setCharge(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount,
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Successfully Added The Item" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "Invalid Entry" });
    }
  };

  const clearItems = () => {
    setExpenses([]);
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "success", text: "Successfuly Deleted" });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  //******************* end of functions *****************************//

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <main className="App">
        <h1 className="display-4 text-dark">{title}</h1>
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseFloat(curr.amount));
          }, 0)}
        </span>
      </h1>
      <div className="d-flex justify-content-center mb-5">
        <Link to="/" className="btn btn-calc text-white">
          <strong>Home</strong>
        </Link>
      </div>
    </>
  );
}

export default BudgetCalculator;
