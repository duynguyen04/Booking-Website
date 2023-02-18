const User = require("../models/User");
exports.postLogin = (req, res, next) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;
  User.find({ username: usernameInput, password: passwordInput }).then(
    (user) => {
      if (user.length <= 0) {
        res.json("");
      } else {
        // console.log(user[0]);
        req.user = user[0];
        res.json(user[0]);
      }
    }
  );
};
exports.postLoginAD = (req, res, next) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;
  User.find({
    username: usernameInput,
    password: passwordInput,
    isAdmin: true,
  }).then((user) => {
    if (user.length <= 0) {
      res.json("");
    } else {
      // console.log(user[0]);
      req.user = user[0];
      res.json(user[0]);
    }
  });
};
