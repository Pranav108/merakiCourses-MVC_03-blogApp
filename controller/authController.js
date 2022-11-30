const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../model/userModel");

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{5,10}$"))
    .required()
    .error(
      () =>
        new Error(
          "password must be 5 to 10 character long and should be alphanumeric"
        )
    ),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    })
    .error(() => new Error("Invalid Email")),
}).unknown(false);

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  const user = await User.query().where("email", "=", req.body.email).first();
  if (!user) {
    const { error, value } = userSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        result: "failure",
        message: error.message,
      });
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    };
    const newUser = await User.query().insert(userData);
    res.status(201).json({
      status: "success",
      message: "Account created Successfully ",
      token: signToken(newUser.id),
      data: newUser,
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
  const user = await User.query().where("email", "=", email).first();
  if (!user)
    return res
      .status(400)
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
    token: signToken(user.id),
    message: "loggedIn successfully",
  });
};

exports.logout = async (req, res, next) =>
  res.status(200).json({
    result: "success",
    message: "logged Out successfully",
  });

exports.protect = async (req, res, next) => {
  // 1) Getting the token and checking if it is correct
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    token = req.headers.authorization.split(" ")[1];
  if (token === "null")
    // best error
    return res.status(400).json({
      result: "failure",
      message:
        "You are not authorized to access this page. Please login first.",
    });

  //2)Verifying the token
  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

  //3)Check if user still exists
  const currentUser = await User.query().findById(decodedInfo.id).first();
  if (!currentUser)
    res.status(400).json({
      result: "failure",
      message:
        "The user belonging to this token no longer exists. Please login again",
    });

  //GRANT ACCESS TO PROTECTED ROUTE

  req.currentUser = currentUser; // will use this to getAllMyPosts
  next();
};
