const removePasswordField = (req, res, next) => {
  req.query.fields = "-password";
  next();
};

module.exports = removePasswordField;
