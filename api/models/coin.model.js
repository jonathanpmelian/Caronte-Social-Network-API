const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
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
  PL: {
    type: Number,
  },
  Change: {
    type: Number,
  },
});

const CoinModel = mongoose.model("coin", coinSchema);
module.exports = CoinModel;
