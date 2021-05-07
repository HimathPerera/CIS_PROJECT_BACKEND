const express = require("express");
const router = express.Router();

const isComplete = require("../controllers/isCompleted-controller");

router.post("/isComplete", isComplete.isComplete);

module.exports = router;
