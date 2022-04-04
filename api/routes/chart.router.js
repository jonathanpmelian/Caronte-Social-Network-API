const router = require("express").Router({ mergeParams: true });

const { checkAuth } = require("../utils/index");

const {
  getChart,
  editChart,
  getPieChart,
} = require("../controllers/chart.controller");

router.get("/", checkAuth, getChart);
router.get("/piechart", checkAuth, getPieChart);
router.put("/", checkAuth, editChart);

module.exports = router;
