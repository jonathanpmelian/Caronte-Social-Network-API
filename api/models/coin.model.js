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
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalInit: {
    type: Number,
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

module.exports = coinSchema;
