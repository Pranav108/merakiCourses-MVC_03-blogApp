const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Joi = require("joi");

// Add JOI
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
  const user = await User.getByEmail(req.body.email);
  if (!user) {
    const { error, value } = userSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        result: "failure",
        message: error.message,
      });

    const encryptedPassword = await bcrypt.hash(value.password, 12);
    const userData = {
      name: value.name,
      email: value.email,
      password: encryptedPassword,
    };
    const newUserId = await User.create(userData)[0];
    res.status(201).json({
      status: "success",
      message: "Account created Successfully ",
      token: signToken(newUserId),
      data: {
        user: {
          id: newUserId,
          name: value.name,
          email: value.email,
        },
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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

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
  const currentUser = await User.get(decodedInfo.id);
  if (!currentUser)
    res.status(400).json({
      result: "failure",
      message: "The user belonging to this token no longer exists.",
    });

  //GRANT ACCESS TO PROTECTED ROUTE

  req.currentUser = currentUser; // will use this to getAllMyPosts
  next();
};
