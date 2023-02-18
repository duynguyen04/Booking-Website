const express = require("express");
const route = express.Router();
const userControler = require("../controllers/user");

route.get("/user", userControler.getUser);

module.exports = route;
