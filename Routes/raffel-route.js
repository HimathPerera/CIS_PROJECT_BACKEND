const express = require("express");
const router = express.Router();

const rafffelWinnerCalculate = require("../controllers/raffel-winner-cal");
const raffelWinner = require("../controllers/raffel-winner");

router.get("/winner", raffelWinner.RaffelWinner);
router.post("/winner/find", rafffelWinnerCalculate.rafffelWinnerController);

module.exports = router;
