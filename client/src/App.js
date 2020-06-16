import React from "react";
import { Stock } from "./Stock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LearnMorePage from "./pages/LearnMorePage";
import Login from "./pages/LoginForm";
import Signup from "./pages/Signup";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import CalculatorDisplay from "./components/ExpenseCalculator/CalculatorDisplay";
import Navbar from "./components/Navbar";
import FinancialSituation from "./pages/FinancialSituation";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Stock />
          </div>
        </Route>
        <Route path="/learnmore">
          <LearnMorePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/calculator">
          <CalculatorDisplay />
        </Route>
        <Route path="/finance">
          <FinancialSituation />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
