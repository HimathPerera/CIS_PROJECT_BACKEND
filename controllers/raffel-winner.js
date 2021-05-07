const HttpError = require("../models/http-error");
const Raffel = require("../models/raffel-winners-model");

const RaffelWinner = async (req, res, next) => {
  let winners;

  try {
    winners = await Raffel.find();
  } catch (err) {
    const error = new HttpError("Raffel list fetching failed", 500);
    return next(error);
  }

  res.status(201).json({ data: winners });
};

exports.RaffelWinner = RaffelWinner;
