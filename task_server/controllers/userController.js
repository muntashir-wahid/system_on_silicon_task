const User = require("./../models/userModel");

exports.registerUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne(req.body);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
