const User = require("./../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");

// CREATE USER OR RESIGER A USER
exports.registerUser = async (req, res) => {
  try {
    const { _id } = await User.create(req.body);

    const features = new APIFeatures(
      User.findById(_id),
      req.query
    ).limitFields();

    const user = await features.query;

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

// USER LOGIN TO PROFILE OR PROFILE ACCESS
exports.loginUser = async (req, res) => {
  try {
    const features = new APIFeatures(
      User.findOne(req.body),
      req.query
    ).limitFields();

    const user = await features.query;

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

// GET A USER
exports.getUser = async (req, res) => {
  try {
    const feature = new APIFeatures(
      User.findById(req.params.id),
      req.query
    ).limitFields();

    const user = await feature.query;

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

// UPDATE A USER
exports.updateUser = async (req, res) => {
  try {
    const options = { runValidators: true, new: true };

    const features = new APIFeatures(
      User.findByIdAndUpdate(req.params.id, req.body, options),
      req.params
    ).limitFields();

    const user = await features.query;

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

// DELETE A USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.error("💥", err);
    res.status(500).json({
      status: "error",
      message: "Something very wrong.Please try again",
    });
  }
};
