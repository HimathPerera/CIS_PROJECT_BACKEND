const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question-controller");
// const HttpError = require("../models/http-error");

router.post("/questions/1", questionController.Shopping);
router.post("/questions/2", questionController.Shoppingitem);
router.post("/questions/3", questionController.methodOfTransport);
router.post("/questions/4", questionController.satisfyQuestion);
router.post("/questions/5", questionController.prefferMethod);
router.post("/questions/7", questionController.prefferVisiting);

module.exports = router;
