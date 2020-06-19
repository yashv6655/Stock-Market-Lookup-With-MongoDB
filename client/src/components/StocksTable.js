import React, { useState } from "react";
import { useContext } from "react";
import { FinanceContext } from "../pages/FinancialSituation";
import axios from "axios";
import { exportPassword } from "../pages/LoginForm";

export default function StocksTable({ users, setUsers, userId }) {
  //Stock Properties
  const [stocks, setStocks] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockCurrentPrice, setStockCurrentPrice] = useState(0);
  const [stockBuyPrice, setStockBuyPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [stockDataAPI, setStockDataAPI] = useState([]);

  const [bool, setBool] = useState(false);

  const { setStocksTotal } = useContext(FinanceContext);

  const updateStocksTotal = async () => {
    let tempTotal = 0;
    await axios.get("/accounts").then((res) => {
      setUsers(res.data);
      users.map((user) => {
        if (user._id === userId) {
          user.stocks.map((stock) => {
            tempTotal +=
              parseFloat(stock.stockBuyPrice) *
                parseFloat(stock.stockQuantity) +
              stocks[0].stockQuantity * stocks[0].stockBuyPrice;
            setTotal(tempTotal);
            setStocksTotal(tempTotal);
          });
        }
      });
    });
    return tempTotal;
  };

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
  }

  const addToList = () => {
    if (stockSymbol === "") {
      alert("Field Can't be left blank");
    } else {
      users.map(async (user) => {
        if (user._id === userId) {
          stocks.push({
            stockSymbol: stockSymbol,
            stockQuantity: stockQuantity,
            stockBuyPrice: stockBuyPrice,
          });
          setStockSymbol("GOOGL");
          setStockQuantity(0);
          setStockBuyPrice(0);
          await axios
            .put("/accounts/" + userId, {
              expenses: [...user.expenses],
              password: exportPassword,
              savings: [...user.savings],
              stocks: [...user.stocks, ...stocks],
            })
            .then((res) => {
              //console.log(res)
            })
            .catch((err) => {
              console.log(err);
              alert("There Was An Error");
            });

          //To avoid duplication of data into database
          setStocks([]);

          await axios.get("/accounts").then((res) => {
            setUsers(res.data);
            updateStocksTotal();
          });
        }
      });
    }
  };

  const subtractStocks = async (id) => {
    let tempTotal = 0;
    await axios
      .get("/accounts")
      .then((res) => {
        setUsers(res.data);
        users.map((user) => {
          if (user._id === userId) {
            user.stocks.map((stock) => {
              if (stock._id === id) {
                let temp = stock.stockBuyPrice * stock.stockQuantity;
                tempTotal = total - temp;
                setTotal(tempTotal);
                setStocksTotal(tempTotal);
              }
            });
          }
        });
      })
      .catch((err) => console.log(err));
  };

  function addInitialTotal() {
    let temp = 0;
    users.map((user) => {
      if (user._id === userId) {
        user.stocks.map((stock) => {
          temp += stock.stockQuantity * stock.stockBuyPrice;
        });
      }
      setStocksTotal(temp);
      return temp;
    });
    return temp;
  }

  const deleteFromList = (id) => {
    users.map(async (user) => {
      if (user._id === userId) {
        subtractStocks(id);
        let tempStocks = user.stocks.filter((item) => item._id !== id);
        await axios.put("/accounts/" + userId, {
          expenses: [...user.expenses],
          password: exportPassword,
          savings: [...user.savings],
          stocks: [...tempStocks],
        });
      }
      await axios
        .get("/accounts")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    });
  };

  const clearList = () => {
    users.map(async (user) => {
      if (user._id === userId) {
        setStockSymbol("GOOGL");
        setStockQuantity(0);
        setStocks([]);
        setTotal(0);
        setStocksTotal(0);
        setStockBuyPrice(0);
        await axios
          .put("/accounts/" + userId, {
            expenses: [...user.expenses],
            password: exportPassword,
            savings: [...user.savings],
            stocks: [],
          })
          .then((res) => {
            //
          })
          .catch((err) => console.log(err));

        await axios
          .get("/accounts")
          .then((res) => setUsers(res.data))
          .catch((err) => console.log(err));
      }
    });
  };

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
            <th scope="col">Price Increase/Decrease</th>
            <th scope="col">Return %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <input
                value={stockSymbol.toUpperCase()}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
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
              <input
                type="number"
                className="form-control-calc"
                value={stockBuyPrice}
                onChange={(e) => setStockBuyPrice(e.target.value)}
              />
            </td>
            <td>$--</td>
            <td>--</td>
            <td>%</td>
            <td>
              <button className="fas fa-plus btn" onClick={addToList}></button>
            </td>
          </tr>

          {users.map((user, index) => {
            if (user._id === userId) {
              return user.stocks.length === 0 || user.stocks === null ? (
                <tr key={index}>
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
                      <td role="alert">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => getCurrentPrice(stock.stockSymbol)}
                        >
                          Get
                        </button>
                      </td>
                      {/* Return Price */}
                      <td
                        className={
                          (stockCurrentPrice - stock.stockBuyPrice).toFixed(2) >
                          0
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {bool
                          ? (stockCurrentPrice - stock.stockBuyPrice).toFixed(2)
                          : "-- "}
                        <i
                          className={
                            (stockCurrentPrice - stock.stockBuyPrice).toFixed(
                              2
                            ) > 0
                              ? "fas fa-arrow-up"
                              : "fas fa-arrow-down"
                          }
                        ></i>
                      </td>
                      {/* End of Return Price */}
                      {/* Percent Return */}
                      <td
                        className={
                          (
                            ((stockCurrentPrice - stock.stockBuyPrice) /
                              stockCurrentPrice) *
                            100
                          ).toFixed(2) > 0
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {bool
                          ? (
                              ((stockCurrentPrice - stock.stockBuyPrice) /
                                stockCurrentPrice) *
                              100
                            ).toFixed(2)
                          : "--"}
                        %
                        <i
                          class={
                            (
                              ((stockCurrentPrice - stock.stockBuyPrice) /
                                stockCurrentPrice) *
                              100
                            ).toFixed(2) > 0
                              ? "fas fa-arrow-up"
                              : "fas fa-arrow-down"
                          }
                        ></i>
                      </td>
                      {/* End of Percent Return */}
                      <td>
                        <button
                          className="fas fa-minus btn"
                          onClick={() => deleteFromList(stock._id)}
                        ></button>
                      </td>
                    </tr>
                  );
                })
              );
            }
          })}

          <tr>
            <th scope="row">Total Spent: </th>
            <td>${total === 0 ? addInitialTotal() : total}</td>
            <td className="text-primary">Current Price:</td>
            {bool ? (
              <td className="lead text-primary">${stockCurrentPrice}</td>
            ) : (
              <td className="lead text-primary">0</td>
            )}
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary mb-4"
        type="button"
        onClick={clearList}
      >
        Clear All
      </button>
      {/* End of Stocks */}
    </div>
  );
}
