const User = require("./../models/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// CREATE USER OR RESIGER A USER
exports.registerUser = catchAsync(async (req, res, next) => {
  const { _id } = await User.create(req.body);

  const features = new APIFeatures(User.findById(_id), req.query).limitFields();

  const user = await features.query;

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

// USER LOGIN TO PROFILE OR PROFILE ACCESS
exports.loginUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    User.findOne(req.body),
    req.query
  ).limitFields();

  const user = await features.query;

  if (!user) {
    return next(new AppError("Email and password dosen't match", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// GET A USER
exports.getUser = catchAsync(async (req, res, next) => {
  const feature = new APIFeatures(
    User.findById(req.params.id),
    req.query
  ).limitFields();

  const user = await feature.query;

  if (!user) {
    return next(new AppError("Can't find the user", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// UPDATE A USER
exports.updateUser = catchAsync(async (req, res, next) => {
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
});

// DELETE A USER
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
