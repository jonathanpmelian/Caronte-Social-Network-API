const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ["BTC", "ETH"],
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD"],
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
  },
  pl: {
    type: Number,
  },
  change: {
    type: Number,
  },
});

const CoinModel = mongoose.model("coin", coinSchema);
module.exports = CoinModel;
