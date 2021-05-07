const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user-model");

/////////////////////////signUp///////////////////////////////////
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  var date = Date.now();

  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs please check again", 406));
  }

  const { name, email, password, mobile } = req.body;

  let existingUser;
  let existingMobile;
  try {
    existingUser = await User.findOne({ email });
    existingMobile = await User.findOne({ mobile });
  } catch (err) {
    const error = new HttpError("sign up failed ", 500);
    return next(error);
  }

  if (existingUser || existingMobile) {
    const error = new HttpError(
      "user email or mobile number already in use try logging in",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("could not create user error occured", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    mobile,
    email,
    password: hashedPassword,
    admin: false,
    isCompleted: false,
    date,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("creating user failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, admin: createdUser.admin },
      "SUPER_SECRET_ONLY_CREATER_KNOWS",
      { expiresIn: 90000000 }
    );
  } catch (err) {
    const error = new HttpError("creating user token failed try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, admin: createdUser.admin, token });
};

///////////////////////LOGIN/////////////////////////////////////
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Login failed wrong email", 500);
    return next(error);
  }
  if (existingUser && existingUser.admin === true) {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError("wrong credentials ", 500);
      return next(error);
    }
    if (!isValidPassword) {
      const error = new HttpError("wrong credentials not an admin");
      return next(error);
    } else {
      let token;
      try {
        token = jwt.sign(
          { userId: existingUser.id, admin: existingUser.admin },
          "SUPER_SECRET_ONLY_CREATER_KNOWS",
          { expiresIn: 90000000 }
        );
      } catch (err) {
        const error = new HttpError(
          "logging admin token failed try again",
          500
        );
        return next(error);
      }
      res
        .status(201)
        .json({ userId: existingUser.id, admin: existingUser.admin, token });
      return 0;
    }
  } else if (existingUser && existingUser.admin === false) {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError("wrong credentials ", 500);
      return next(error);
    }
    if (!isValidPassword) {
      const error = new HttpError("wrong credentials ");
      return next(error);
    }
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, admin: existingUser.admin },
      "SUPER_SECRET_ONLY_CREATER_KNOWS",
      { expiresIn: 90000000 }
    );
  } catch (err) {
    const error = new HttpError("logging user token failed try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: existingUser.id, admin: existingUser.admin, token });
};

exports.signup = signup;
exports.login = login;
