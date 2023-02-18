const express = require("express");
const route = express.Router();
const transactionControler = require("../controllers/transaction");

route.post("/reserve", transactionControler.postAddTransaction);
route.get("/hotel-trans/:hotelId", transactionControler.getHotelinTrans);
route.get("/trans/:username", transactionControler.getTrans);
route.get("/lastest-transaction", transactionControler.getLastestTransaction);
route.get("/transactions", transactionControler.getTransactiom);

module.exports = route;
