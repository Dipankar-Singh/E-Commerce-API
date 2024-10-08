const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user",
    timestamps: true,
  }
);
module.exports = mongoose.model("user", user);
