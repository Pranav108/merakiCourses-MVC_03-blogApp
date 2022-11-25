const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  const user = await User.getByEmail(req.body.email);
  if (!user) {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    };
    const newUserId = await User.create(userData);

    const token = signToken(newUserId);

    res.status(201).json({
      status: "success",
      message: "Account created Successfully ",
      token,
      data: {
        user: { id: newUserId, name: req.body.name, email: req.body.email },
      },
    });
  } else
    return res
      .status(409)
      .json({ result: "failure", message: "user already exists" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email || !password)
    return res.status(400).json({
      result: "failure",
      message: "Please provide email and password",
    });

  // 2) check if user exist and password is correct
  const user = await User.getByEmail(email);
  if (!user)
    return res
      .status(409)
      .json({ result: "failure", message: "user doesn't exist" });

  // 3) check if is correct
  const isCorrect = await bcrypt.compare(password, user.password); // candidatePassword <> actualPassword
  if (!isCorrect)
    return res.status(404).json({
      result: "failure",
      message: "Incorrect password",
    });

  // 4) if everything is ok, send toke to the client
  res.status(200).json({
    result: "success",
    message: "loggedIn successfully",
    token: signToken(user._id),
  });
};
