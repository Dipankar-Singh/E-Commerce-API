const express = require("express");
require("dotenv").config();
const app = express();
const connectDb = require("./connection");
const router = require("./Routes/protectedRoutes");
const unProtectedRoutes = require("./Routes/userRegistrationAndLoginRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/user", unProtectedRoutes);
const PORT = process.env.port;

app.listen(PORT, () => {
  connectDb();
  console.log(`API started working on port number ${PORT}`);
});
