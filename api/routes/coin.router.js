const router = require("express").Router({ mergeParams: true });

const { checkAuth, updatePrice } = require("../utils/index");

const {
  addCoin,
  editOneCoin,
  deleteOneCoin,
} = require("../controllers/coin.controller");

router.post("/", checkAuth, addCoin);
router.put("/:coinId", checkAuth, editOneCoin, updatePrice);
router.delete("/:coinId", checkAuth, deleteOneCoin);

module.exports = router;
