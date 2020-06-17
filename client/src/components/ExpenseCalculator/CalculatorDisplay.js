import React from "react";
import BudgetCalculator from "./BudgetCalculator";

export default function CalculatorDisplay() {
  return (
    <div>
      <BudgetCalculator title="Expenses" localStorageTitle="expenses" />
      <BudgetCalculator title="Savings" localStorageTitle="savings" />
    </div>
  );
}
