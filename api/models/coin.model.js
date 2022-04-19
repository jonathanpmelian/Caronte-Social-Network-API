const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ["BTC", "ETH", "ADA"],
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
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
  actual: {
    type: Number,
  },
});

module.exports = coinSchema;
