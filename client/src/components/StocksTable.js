import React, { useState } from "react";
import { useContext } from "react";
import { FinanceContext } from "../pages/FinancialSituation";
import axios from "axios";

export default function StocksTable({ users, setUsers, userId }) {
  //Stock Properties
  const [stocks, setStocks] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockBuyPrice, setStockBuyPrice] = useState(0);
  const [stockCurrentPrice, setStockCurrentPrice] = useState(0);
  const [stockReturn, setStockReturn] = useState(0);
  const [stockPurchasePrice, setStockPurchasePrice] = useState(0);
  const [total, setTotal] = useState(0);

  const { setStocksTotal } = useContext(FinanceContext);

  return (
    <div className="col-sm">
      {/* Stocks */}
      <table className="table table-primary">
        <thead>
          <tr>
            <th scope="col">Stock</th>
            <th scope="col">Quantity</th>
            <th scope="col">Buy Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Return</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <input
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
                className="form-control-calc"
              />
            </th>
            <td>{userId}</td>
          </tr>
          <tr>
            <th scope="row">Total: </th>
            <td>$1111111111</td>
          </tr>
        </tbody>
      </table>
      {/* End of Stocks */}
    </div>
  );
}
