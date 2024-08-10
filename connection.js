const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.db}`);
    console.log(`Connected with Database ${process.env.db}`);
  } catch (error) {
    console.error(
      `Error occurred while connecting with MongoDB: ${error.message}`
    );
  }
};

module.exports = connectDb;
