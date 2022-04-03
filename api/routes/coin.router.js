const router = require("express").Router({ mergeParams: true });

const { checkAuth } = require("../utils/index");

router.post("/", checkAuth, addCoin);
router.put("/:coinId", checkAuth, editOneCoin);
router.delete("/:coinId", checkAuth, deleteOneCoin);

module.exports = router;
