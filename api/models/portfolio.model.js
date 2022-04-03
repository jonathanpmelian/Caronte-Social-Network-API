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
  currency: {
    type: String,
    required: true,
    enum: ["EUR", "USD", "JPY"],
  },
  adquisitionCost: {
    type: Number,
  },
  holding: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  bestCrypto: {
    type: String,
  },
  worstCrypto: {
    type: String,
  },
  holdingHistory: [
    {
      amount: Number,
      date: Date,
    },
  ],
  coins: [coinSchema],
});

const PortfolioModel = mongoose.model("portfolio", portfolioSchema);
module.exports = PortfolioModel;
