require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var accountRoutes = require("./controllers/accountController");

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.listen(process.env.PORT || 4000, () =>
  console.log("Server started at : 4000")
);

app.use("/accounts", accountRoutes);
