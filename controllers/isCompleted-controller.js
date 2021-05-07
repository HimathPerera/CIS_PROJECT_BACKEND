const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user-model");

const isComplete = async (req, res, next) => {
  const { isComplete, token } = req.body;

  const decodedToken = jwt.verify(token, "SUPER_SECRET_ONLY_CREATER_KNOWS");
  const userId = decodedToken.userId;

  let existingUser;
  try {
    existingUser = await User.findOne({ _id: userId });
  } catch (err) {
    const error = new HttpError("User not registered ", 401);
    return next(error);
  }

  console.log(existingUser);
  if (existingUser) {
    existingUser.isCompleted = isComplete;
    try {
      await existingUser.save();
    } catch (err) {
      const error = new HttpError("updating user failed", 500);
      return next(error);
    }
  }
  res.status(201).json({ message: "updated user successfully" });
};

exports.isComplete = isComplete;
