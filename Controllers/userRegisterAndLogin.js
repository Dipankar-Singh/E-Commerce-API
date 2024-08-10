const user = require("../Models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const saltPassword = 10;
const registeruser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(404).json({ msg: "Necessary Data is missing" });
    }
    const findUser = await user.findOne({ email });
    if (findUser) {
      return res.status(400).json({ msg: "Account is already created" });
    }
    const hashedPassword = await bcrypt.hash(password, saltPassword);
    const createUser = new user({
      userName,
      email,
      password: hashedPassword,
    });
    await createUser.save();
    return res.status(200).json({ msg: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
const getAllUser = async (_, res) => {
  try {
    const allUser = await user.find();
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = await user.findOne({ email });
    if (!userEmail) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    const passwordCheck = await bcrypt.compare(password, userEmail.password);
    if (!passwordCheck) {
      return res.status(404).json({ msg: "Password Not matched" });
    }
    const accessToken = jwt.sign(
      {
        email: userEmail.email,
        id: userEmail._id,
      },
      process.env.secretKey,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        email: userEmail.email,
        id: userEmail._id,
      },
      process.env.refreshKey,
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: userEmail._id,
    });
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
module.exports = { registeruser, getAllUser, login };
