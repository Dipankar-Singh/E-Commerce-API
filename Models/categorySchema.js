const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
    },
  },
  { collection: "category", timestamps: true }
);
module.exports = mongoose.model("category", category);
