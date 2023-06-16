const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
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
    totalAmount: {
      type: String,
      required: true,
    },
    ShippingAddress: {
        type: String,
        required: true
    }
  },
  {
    collection: "Orders",
    timestamp: true,
  }
);

module.exports = mongoose.model("Orders", ordersSchema);
