const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");
// const HttpError = require("../models/http-error");

router.post("/login", userController.login);
// router.post("/login/admin", userController.logiAsAdmin);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("mobile").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

module.exports = router;
