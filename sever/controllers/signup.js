const User = require("../models/User");

exports.postAdduser = (req, res, next) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;
  User.find({ username: usernameInput }).then((user) => {
    console.log(user);
    if (user.length <= 0) {
      const user = new User({
        username: usernameInput,
        password: passwordInput,
      });
      console.log("da tao user");
      res.json({ status: "success" });
      user.save();
    } else {
      res.json({ status: "fail" });
      console.log("that bai");
    }
  });
};
