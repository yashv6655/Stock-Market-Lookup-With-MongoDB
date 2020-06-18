import React, { useState } from "react";
import { useContext } from "react";
import { FinanceContext } from "../pages/FinancialSituation";
import axios from "axios";
import { useEffect } from "react";

export default function StocksTable({ users, setUsers, userId }) {
  //Stock Properties
  const [stocks, setStocks] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockCurrentPrice, setStockCurrentPrice] = useState(0);
  const [stockBuyPrice, setStockBuyPrice] = useState(0);
  const [stockReturn, setStockReturn] = useState(0);
  const [stockPurchasePrice, setStockPurchasePrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [stockDataAPI, setStockDataAPI] = useState([]);

  const [loading, setLoading] = useState(false);

  const [bool, setBool] = useState(false);

  const { setStocksTotal } = useContext(FinanceContext);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${process.env.REACT_API_KEY}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       for (let i in res.data["Time Series (Daily)"]) {
  //         //console.log(res.data["Time Series (Daily)"][i]["4. close"]);
  //         stockDataAPI.push(res.data["Time Series (Daily)"][i]["4. close"]);
  //       }
  //       //console.log(stockData[0]);
  //     });
  // });

  function getCurrentPrice(symbol) {
    stockDataAPI.length = 0;
    setBool(false);
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${process.env.REACT_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        for (let i in res.data["Time Series (Daily)"]) {
          if (stockDataAPI === 100) {
            setStockDataAPI([]);
          }
          //console.log(res.data["Time Series (Daily)"][i]["4. close"]);
          stockDataAPI.push(res.data["Time Series (Daily)"][i]["4. close"]);
        }
        //console.log(stockDataAPI[0]);
        setStockCurrentPrice(stockDataAPI[0]);
        setBool(true);
      });
    // if (bool) return <td>{stockCurrentPrice}</td>;

    // console.log(stockCurrentPrice);

    //stockDataAPI[0] ? setLoading(true) : setLoading(false);
  }

  return (
    <div className="col-sm">
      {/* Stocks */}
      <table className="table table-primary">
        <thead>
          <tr>
            <th scope="col">Stock Symbol</th>
            <th scope="col">Quantity</th>
            <th scope="col">Buy Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Return Price</th>
            <th scope="col">Return %</th>
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
            <td>
              <input
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="form-control-calc"
              />
            </td>
            <td>
              <small>
                <strong>$--</strong>
              </small>
            </td>
            <td>
              <small>
                <strong>$--</strong>
              </small>
            </td>
            <td>--</td>
            <td>%</td>
            <td>
              <button className="fas fa-plus btn"></button>
            </td>
          </tr>

          {users.map((user) => {
            if (user._id === userId) {
              return user.stocks.length === 0 || user.stocks === null ? (
                <tr>
                  <th scope="row">Enter Stock Symbol</th>
                  <td>Enter Stock Quantity</td>
                </tr>
              ) : (
                user.stocks.map((stock, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{stock.stockSymbol}</th>
                      <td>{stock.stockQuantity}</td>
                      <td>${stock.stockBuyPrice}</td>
                      <td>$</td>
                      <td>$</td>
                      <td>%</td>
                      <td>
                        <button
                          className="fas fa-minus btn"
                          //onClick={() => deleteFromList(saving._id)}
                        ></button>
                      </td>
                      <td role="alert">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => getCurrentPrice(stock.stockSymbol)}
                        >
                          Get Current Price
                        </button>
                      </td>
                    </tr>
                  );
                })
              );
            }
          })}

          <tr>
            <th scope="row">Total: </th>
            <td>$1111111111</td>
            <td>--</td>
            {bool ? <td>${stockCurrentPrice}</td> : <td>0</td>}
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary mb-4" type="button">
        Clear All
      </button>
      {/* End of Stocks */}
    </div>
  );
}
