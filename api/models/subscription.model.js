const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  type: {
    type: String,
    required: true,
    enum: ["Anual", "Monthly", "Weekly"],
  },
  price: {
    type: Number,
    enum: [110, 10, 4],
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

const SubscriptionModel = mongoose.model("subscription", subscriptionSchema);
module.exports = SubscriptionModel;
