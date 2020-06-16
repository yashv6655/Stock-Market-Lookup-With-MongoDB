import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { userId, exportPassword } from "./LoginForm";
import ExpensesTable from "../components/ExpensesTable";
import SavingsTable from "../components/SavingsTable";
import StocksTable from "../components/StocksTable";

export default function FinancialSituation() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/accounts").then((res) => {
      setUsers(res.data);
      //console.log(res.data);
    });
  }, []);

  return (
    <div className="col-sm">
      <div className="d-flex justify-content-center row">
        <ExpensesTable
          users={users}
          setUsers={setUsers}
          userId={userId}
          exportPassword={exportPassword}
        />
        <SavingsTable
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
    </div>
  );
}
