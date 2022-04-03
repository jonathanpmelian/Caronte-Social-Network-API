const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  coins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coin",
    },
  ],
});

const PortfolioModel = mongoose.model("portfolio", portfolioSchema);
module.exports = PortfolioModel;
