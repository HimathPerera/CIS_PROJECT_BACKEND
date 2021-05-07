const express = require("express");
const router = express.Router();

const adminChartController = require("../controllers/admin-chart-controller");

router.get("/frequency", adminChartController);

module.exports = router;
