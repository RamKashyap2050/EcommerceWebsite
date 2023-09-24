const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  },
  {
    collection: "Cart",
    timestamp: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
