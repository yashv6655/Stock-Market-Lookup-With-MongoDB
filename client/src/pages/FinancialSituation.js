import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { userId, exportPassword } from "./LoginForm";
import ExpensesTable from "../components/ExpensesTable";
import SavingsTable from "../components/SavingsTable";
import StocksTable from "../components/StocksTable";
import { createContext } from "react";
import Alert from "../components/Alert";

const FinanceContext = createContext();

export default function FinancialSituation() {
  const [users, setUsers] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [savingsTotal, setSavingsTotal] = useState(0);
  const [stocksTotal, setStocksTotal] = useState(0);

  useEffect(() => {
    axios.get("/accounts").then((res) => {
      setUsers(res.data);
      //console.log(res.data);
    });
  }, []);

  return (
    <FinanceContext.Provider
      value={{ setExpensesTotal, setSavingsTotal, setStocksTotal }}
    >
      <div className="col-sm">
        <Alert userId={userId} />
        <div className="d-flex justify-content-center row">
          <SavingsTable
            users={users}
            setUsers={setUsers}
            userId={userId}
            exportPassword={exportPassword}
          />
          <ExpensesTable
            users={users}
            setUsers={setUsers}
            userId={userId}
            exportPassword={exportPassword}
          />
          <StocksTable
            users={users}
            setUsers={setUsers}
            userId={userId}
            exportPassword={exportPassword}
          />
        </div>
        <div
          style={{ background: "#b5b5b5" }}
          className="d-flex py-2 text-white text-center justify-content-center row"
        >
          <p
            className={
              savingsTotal - expensesTotal >= 0
                ? "lead text-success"
                : "lead text-danger"
            }
          >
            Without Stock Expenses{" "}
            <strong>${savingsTotal - expensesTotal}</strong>
          </p>
        </div>
        <div
          style={{ background: "#b5b5b5" }}
          className="d-flex py-1 text-white text-center justify-content-center row"
        >
          <p
            className={
              savingsTotal - (expensesTotal + stocksTotal) >= 0
                ? "lead text-success"
                : "lead text-danger"
            }
          >
            With Stock Expenses{" "}
            <strong>${savingsTotal - (expensesTotal + stocksTotal)}</strong>
          </p>
        </div>
      </div>
    </FinanceContext.Provider>
  );
}
export { FinanceContext };
