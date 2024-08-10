const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.secretKey;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.id !== req.params.id) {
      return res.status(400).json({ msg: "Not Authorized Person" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
