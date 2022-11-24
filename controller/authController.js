const knex = require("../config/db.config");
const User = require("../model/userModel");

async function signup(req, res) {
  // validation JOI
  const user = await User.getByEmail(req.body.email);
  if (!user) {
    // will be removed later
    const newUser = await User.create({ ...req.body });
    return res.json(newUser);
  } else {
    return res.status(409).json({ message: "user already exists" });
  }
}

module.exports = {
  signup,
};
