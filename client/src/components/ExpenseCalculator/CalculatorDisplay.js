import React from "react";
import BudgetCalculator from "./BudgetCalculator";

export default function CalculatorDisplay() {
  return (
    <div>
      <BudgetCalculator title="Expenses" localStorageTitle="expenses" />
      <BudgetCalculator title="Assets/Savings" localStorageTitle="savings" />
    </div>
  );
}
