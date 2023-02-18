const express = require("express");
const route = express.Router();
const signupControler = require("../controllers/signup");

route.post("/signup", signupControler.postAdduser);

module.exports = route;
