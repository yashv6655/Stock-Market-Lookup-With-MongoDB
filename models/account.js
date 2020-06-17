const mongoose = require("mongoose");

var Account = mongoose.model(
  "Account",
  {
    email: { type: String },
    password: { type: String },
    expenses: [{ name: String, amount: Number }],
    savings: [{ name: String, amount: Number }],
    stocks: [
      { stockSymbol: String, stockQuantity: Number, stockBuyPrice: Number },
    ],
  },
  "accounts"
);

module.exports = { Account };
