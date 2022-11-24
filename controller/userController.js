const User = require("../model/userModel");

async function getAllUsers(req, res) {
  const all = await User.all();
  return res.json(all);
}

async function getUser(req, res) {
  const user = await User.get(req.params.id);
  return res.send(user);
}

module.exports = {
  getAllUsers,
  getUser,
};
