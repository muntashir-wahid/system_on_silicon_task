const express = require("express");

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require("./../controllers/userController");
const removePasswordField = require("./../middlewares/removePasswordField");

const router = express.Router();

router.route("/register").post(removePasswordField, registerUser);

router.route("/login").post(removePasswordField, loginUser);

router
  .route("/:id")
  .get(removePasswordField, getUser)
  .patch(removePasswordField, updateUser);
module.exports = router;
