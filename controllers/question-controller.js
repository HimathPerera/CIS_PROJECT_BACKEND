const HttpError = require("../models/http-error");
const ShoppingFrequency = require("../models/shoppingFrequency.model");
const ShoppingItem = require("../models/shoppingItem.model");
const methodOfT = require("../models/methodOfTransport-Q-model");
const satisfy = require("../models/satisfy_Q");
const prefferOnline = require("../models/prefferOnline-Q");
const visitingPref = require("../models/visiting-pref-Q");

const Shopping = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new ShoppingFrequency({
    value: value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }

  res.status(201).json({ value: addedValue });
};

const Shoppingitem = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new ShoppingItem({
    value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }

  res.status(201).json({ value: addedValue });
};

const methodOfTransport = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new methodOfT({
    value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }
  res.status(201).json({ value: addedValue });
};

const satisfyQuestion = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new satisfy({
    value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }

  res.status(201).json({ value: addedValue });
};
const prefferMethod = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new prefferOnline({
    value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }

  res.status(201).json({ value: addedValue });
};
const prefferVisiting = async (req, res, next) => {
  const { value } = req.body;

  const addedValue = new visitingPref({
    value,
  });

  try {
    await addedValue.save();
  } catch (err) {
    const error = new HttpError("survay failed", 500);
    return next(error);
  }

  res.status(201).json({ value: addedValue });
};

exports.Shopping = Shopping;
exports.Shoppingitem = Shoppingitem;
exports.methodOfTransport = methodOfTransport;
exports.prefferMethod = prefferMethod;
exports.satisfyQuestion = satisfyQuestion;
exports.prefferVisiting = prefferVisiting;
