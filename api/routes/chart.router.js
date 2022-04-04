const router = require("express").Router({ mergeParams: true });

const { checkAuth } = require("../utils/index");

const { getChart, editChart } = require("../controllers/chart.controller");

router.get("/", checkAuth, getChart);
router.put("/", checkAuth, editChart);

module.exports = router;
