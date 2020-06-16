const mongoose = require("mongoose");

var Account = mongoose.model(
  "Account",
  {
    email: { type: String },
    password: { type: String },
    expenses: [{ name: String, amount: Number }],
    savings: [{ name: String, amount: Number }],
    stocks: { type: Array, default: [{ name: "Stock", amount: 0 }] },
  },
  "accounts"
);

module.exports = { Account };
