const User = require("../model/userModel");

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.query();
  return res.json(allUsers);
};

exports.getUser = async (req, res) => {
  const user = await User.query().findById(req.params.id);
  return res.send(user);
};
