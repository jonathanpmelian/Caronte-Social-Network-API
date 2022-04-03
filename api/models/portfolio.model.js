const mongoose = require("mongoose");
const coinSchema = require("../models/coin.model");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coins: [coinSchema],
  currency: {
    type: String,
    required: true,
    enum: ["EUR", "USD", "JPY"],
  },
});

const PortfolioModel = mongoose.model("portfolio", portfolioSchema);
module.exports = PortfolioModel;
