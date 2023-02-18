const express = require("express");
const route = express.Router();
const loginControler = require("../controllers/login");

route.post("/login", loginControler.postLogin);
route.post("/loginAD", loginControler.postLoginAD);

module.exports = route;
