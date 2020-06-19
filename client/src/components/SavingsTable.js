import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { FinanceContext } from "../pages/FinancialSituation";

export default function SavingsTable({
  users,
  setUsers,
  userId,
  exportPassword,
}) {
  //Savings Properties
  const [total, setTotal] = useState(0);
  const [savings, setSavings] = useState([]);
  const [savingsName, setSavingsName] = useState([]);
  const [savingsAmount, setSavingsAmount] = useState([]);

  const { setSavingsTotal } = useContext(FinanceContext);

  const updateSavings = async () => {
    //console.log(savings);
    let tempTotal = 0;
    await axios.get("/accounts").then((res) => {
      setUsers(res.data);
      users.map((user) => {
        if (user._id === userId) {
          user.savings.map((saving) => {
            tempTotal +=
              parseFloat(saving.amount) + parseFloat(savings[0].amount);
            setTotal(tempTotal);
            setSavingsTotal(tempTotal);
          });
        }
      });
    });
    return tempTotal;
  };

  const subtractSavings = async (id) => {
    //console.log(savings);
    let tempTotal = 0;

    await axios.get("/accounts").then((res) => {
      setUsers(res.data);
      users.map((user) => {
        if (user._id === userId) {
          user.savings.map((saving) => {
            if (saving._id === id) {
              let temp = saving.amount;
              tempTotal = total - temp;
              setTotal(tempTotal);
              setSavingsTotal(tempTotal);
            }
          });
        }
      });
    });
    return tempTotal;
  };

  const addToList = () => {
    if (savingsName === "") {
      alert("Field Can't be left blank");
    } else {
      users.map(async (user) => {
        if (user._id === userId) {
          savings.push({ name: savingsName, amount: savingsAmount });
          setSavingsName("");
          setSavingsAmount(0);
          await axios
            .put("/accounts/" + userId, {
              expenses: [...user.expenses],
              password: exportPassword,
              savings: [...user.savings, ...savings],
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
          setSavings([]);

          await axios
            .get("/accounts")
            .then((res) => {
              setUsers(res.data);
              updateSavings();
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  function addInititalTotal() {
    let temp = 0;
    users.map((user) => {
      if (user._id === userId) {
        user.savings.map((saving) => {
          temp += saving.amount;
        });
      }
      setSavingsTotal(temp);
      return temp;
    });
    return temp;
  }

  const deleteFromList = (id) => {
    //console.log(id);
    users.map(async (user) => {
      if (user._id === userId) {
        subtractSavings(id);
        let tempSavings = user.savings.filter((item) => item._id !== id);
        await axios.put("/accounts/" + userId, {
          expenses: [...user.expenses],
          password: exportPassword,
          savings: [...tempSavings],
          stocks: [...user.stocks],
        });
      }
      await axios
        .get("/accounts")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    });
  };

  const clearList = () => {
    users.map(async (user) => {
      if (user._id === userId) {
        setSavingsName("");
        setSavingsAmount(0);
        setSavings([]);
        setTotal(0);
        setSavingsTotal(0);
        await axios
          .put("/accounts/" + userId, {
            expenses: [...user.expenses],
            password: exportPassword,
            savings: [],
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
              Income
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
                placeholder="Ex. Salary"
                type="text"
                value={savingsName}
                onChange={(e) => setSavingsName(e.target.value)}
              />
            </th>
            <td>
              <input
                type="number"
                className="form-control-calc"
                value={savingsAmount}
                onChange={(e) => setSavingsAmount(e.target.value)}
                required
              />
            </td>
            <td>
              <button className="fas fa-plus btn" onClick={addToList}></button>
            </td>
          </tr>
          {users.map((user, index) => {
            if (user._id === userId) {
              return user.savings.length === 0 || user.savings === null ? (
                <tr key={index}>
                  <th scope="row">Enter Savings Title</th>
                  <td>Enter Savings Amount</td>
                </tr>
              ) : (
                user.savings.map((saving, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{saving.name}</th>
                      <td>${saving.amount}</td>
                      <td>
                        <button
                          className="fas fa-minus btn"
                          onClick={() => deleteFromList(saving._id)}
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
            <td>${total === 0 ? addInititalTotal() : total}</td>
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
