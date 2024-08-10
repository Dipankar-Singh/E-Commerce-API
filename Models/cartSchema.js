const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cart = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { collection: "cart", timestamps: true }
);
module.exports = mongoose.model("cart", cart);
