const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
    },
  },
  { collection: "product", timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
