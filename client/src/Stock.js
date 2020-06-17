import React from "react";
import Plot from "react-plotly.js";
import defaultImg from "./newsThumbnail.jpg";

var stockSymbol = "GOOGL";
var stockDisplaytype = "compact";
let tempYVals100 = [];
let tempXVals100 = [];
let tempXVals = [];
let tempYVals = [];
let newsArray = [];

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      smaChartXValues: [],
      smaChartYValues: [],
      closePricesArray: [],
      highPriceArray: [],
      lowPriceArray: [],
      stockSymbolDisplay: "",
      title: "GOOGL",
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    //console.log(pointerToThis);
    const API_KEY = process.env.REACT_API_KEY;
    const NEWS_API_KEY = process.env.REACT_APP_NEWS_KEY;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    today = yyyy + "-" + mm + "-" + dd;

    // this.state.stockSymbolDisplay = stockSymbol;
    let API_Call_ALPHA = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=${stockDisplaytype}&apikey=${API_KEY}`;
    let API_Call_SMA = `https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=daily&time_period=2&series_type=open&apikey=${API_KEY}`;
    let API_CALL_NEWS = `https://gnews.io/api/v3/search?q=${stockSymbol}&max=10&token=ffff71b35644b14ad953a6a4a594aea6`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let smaXValuesFunction = [];
    let smaYValuesFunction = [];
    let getCloseArray = [];
    let getHighPriceArray = [];
    let getLowPriceArray = [];

    //this.setState({ stockSymbolDisplay: stockSymbol });
    Promise.all([
      fetch(API_Call_ALPHA),
      fetch(API_Call_SMA),
      fetch(API_CALL_NEWS),
    ])
      .then(function ([alpha, sma, news]) {
        return [alpha.json(), sma.json(), news.json()];
      })
      .then(function ([alphaData, smaData, newsData]) {
        console.log(alphaData, smaData, newsData);

        alphaData.then((result) => {
          //console.log(result);
          for (var key in result["Time Series (Daily)"]) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(
              result["Time Series (Daily)"][key]["1. open"]
            );
            getHighPriceArray.push(
              result["Time Series (Daily)"][key]["2. high"]
            );
            getLowPriceArray.push(result["Time Series (Daily)"][key]["3. low"]);
            getCloseArray.push(result["Time Series (Daily)"][key]["4. close"]);
          }

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction,
            closePricesArray: getCloseArray,
            highPriceArray: getHighPriceArray,
            lowPriceArray: getLowPriceArray,
          });
        });

        smaData.then((result) => {
          for (var key in result["Technical Analysis: SMA"]) {
            smaXValuesFunction.push(key);
            smaYValuesFunction.push(
              result["Technical Analysis: SMA"][key]["SMA"]
            );
          }
          tempXVals = smaXValuesFunction;
          tempYVals = smaYValuesFunction;

          for (var i = 0; i < 100; i++) {
            tempXVals100.push(smaXValuesFunction[i]);
            tempYVals100.push(smaYValuesFunction[i]);
          }
          //console.log(sma100);

          pointerToThis.setState({
            smaChartXValues: smaXValuesFunction,
            smaChartYValues: smaYValuesFunction,
          });
        });

        newsData.then((result) => {
          newsArray = result.articles;
          console.log(newsArray);
        });

        // console.log(stockChartXValuesFunction);
      });
  }

  handleClick = () => {
    stockSymbol = this.state.stockSymbolDisplay.toUpperCase();

    this.setState({
      title: stockSymbol,
    });
    this.fetchStock();
  };

  handleFullDisplay = () => {
    console.log("Full Display");
    stockDisplaytype = "full";
    this.fetchStock();
  };

  handleCompactDisplay = () => {
    console.log("Compact Displays");
    stockDisplaytype = "compact";
    this.fetchStock();
  };

  render() {
    return (
      <div className="bg-light">
        <div className=" mt-5">
          {/* Stock Search Start */}
          <div className="mt-5 text-center">
            <input
              className="mt-5"
              name="userSymbol"
              placeholder="Enter Stock Symbol or News You Want to Know About"
              onChange={(event) =>
                this.setState({
                  stockSymbolDisplay: event.target.value.toUpperCase(),
                })
              }
              value={this.state.stockSymbolDisplay.toUpperCase()}
            />
            {/* Search Button */}
            <button
              className="btn btn-warning mx-2 p-1"
              onClick={this.handleClick}
            >
              Search
            </button>
            {/* End of Search Button */}
          </div>
          {/* Stock Search End */}

          {/* View Stock History Buttons */}
          <div className="mt-3 text-center">
            <button
              className="btn btn-light mr-2"
              onClick={this.handleFullDisplay}
            >
              View Full History
            </button>
            <button
              className="btn btn-light"
              onClick={this.handleCompactDisplay}
            >
              Past 100 Days
            </button>
          </div>
          {/* End View Stock History Buttons */}
          <div className="container">
            <div className="row">
              {/* table */}
              <div className="col-sm">
                <table className="table table-striped table-bordered ">
                  <tbody>
                    <tr>
                      <th scope="row">Date</th>
                      <td>{this.state.stockChartXValues[0]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Previous Close</th>
                      <td>${this.state.closePricesArray[0]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Open</th>
                      <td>${this.state.stockChartYValues[0]}</td>
                    </tr>
                    <tr>
                      <th scope="row">High</th>
                      <td>${this.state.highPriceArray[0]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Low</th>
                      <td>${this.state.lowPriceArray[0]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* end of table */}

              {/* Start of Stock Graph */}
              <div className="col-sm d-flex justify-content-center">
                <div className="">
                  {/* w-50 mx-auto */}
                  <Plot
                    className=""
                    style={{ marginLeft: "0" }}
                    data={[
                      {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "#21ce99" },
                        name: stockSymbol,
                      },
                    ]}
                    layout={{
                      width: 365,
                      height: 350,
                      title: `${this.state.title}'s Stock`,
                      titlefont: { size: 25 },
                      paper_bgcolor: "#f8f9fa",
                      plot_bgcolor: "#f8f9fa",
                    }}
                  />
                </div>
              </div>
              {/* End of Stock Graph */}

              {/* Start of SMA Graph */}
              <div className="col-sm d-flex justify-content-center">
                <div>
                  <Plot
                    className=""
                    data={[
                      {
                        x: this.state.smaChartXValues,
                        y: this.state.smaChartYValues,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: "black" },
                        name: "SMA Line History",
                      },
                    ]}
                    layout={{
                      width: 365,
                      height: 350,
                      title: `${this.state.title}'s Full SMA History`,
                      titlefont: { size: 25 },
                      paper_bgcolor: "#f8f9fa",
                      plot_bgcolor: "#f8f9fa",
                    }}
                  />
                </div>
              </div>
              {/* End of SMA Graph */}
            </div>
          </div>

          {/* News Section Start */}
          <div className="container-fluid">
            <h2>{stockSymbol}'s Latest Updates</h2>
            <div className="container-fluid">
              <ul>
                {newsArray.map((item, index) => {
                  return (
                    <div
                      className="card mt-2"
                      style={{ marginRight: "2.5rem" }}
                      key={index}
                    >
                      <li>
                        <img
                          className="card-img-top article-img"
                          // style={{ height: "7rem", width: "10rem" }}
                          src={item.image ? item.image : defaultImg}
                          alt="news"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.description}</p>
                          <a
                            className="article-link btn btn-secondary mt-5"
                            href={item.url}
                          >
                            Read More
                          </a>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* End of News Section */}
        </div>
        {/* End of Below the Scroll Animation */}
      </div>
    );
  }
}

export { Stock };
export { stockSymbol };
