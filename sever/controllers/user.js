const User = require("../models/User");

exports.getUser = (req, res, next) => {
  //   User.find({ username: req.user.username }).then((user1) =>
  //     console.log(user1)
  //   );
  console.log(req.user);
};
