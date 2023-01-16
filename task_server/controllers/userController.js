const User = require("./../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { _id } = await User.create(req.body);

    const user = await User.findById(_id).select("-__v -password");

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error("💥", err);
    res.status(500).json({
      status: "error",
      message: "Something very wrong.Please try again",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-__v -password");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error("💥", err);
    res.status(500).json({
      status: "error",
      message: "Something very wrong.Please try again",
    });
  }
};
