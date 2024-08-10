const express = require("express");
const unProtectedRoutes = express.Router();
const { registeruser, login } = require("../Controllers/userRegisterAndLogin");
unProtectedRoutes.post("/registeruser", registeruser);
unProtectedRoutes.post("/login", login);
module.exports = unProtectedRoutes;
