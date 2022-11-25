const User = require("../model/userModel");

exports.getAllUsers = async (req, res) => {
  const all = await User.all();
  return res.json(all);
};

exports.getUser = async (req, res) => {
  const user = await User.get(req.params.id);
  return res.send(user);
};
