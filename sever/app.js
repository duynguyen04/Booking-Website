const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const hotelRoute = require("./routes/hotel");
const userRoute = require("./routes/user");
const TransactionRoute = require("./routes/transaction");

const app = express();
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// app.get("/", (req, res, next) => {
//   res.json();
// });
app.use(signupRoute);
app.use(loginRoute);
app.use(hotelRoute);
app.use(userRoute);
app.use(TransactionRoute);

mongoose
  .connect(
    "mongodb+srv://duy:1@asm2.ag8rtwz.mongodb.net/asm2?retryWrites=true&w=majority"
  )
  .then((a) => {
    // console.log("a");
    app.listen(5000);
  });
