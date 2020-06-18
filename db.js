const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DB_CONNECTION_STRING || process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connection succeeded.");
    else
      console.log(
        "Error while connecting MongoDB : " + JSON.stringify(err, undefined, 2)
      );
  }
);
