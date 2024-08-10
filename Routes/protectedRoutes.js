const express = require("express");
const router = express.Router();
const upload = require("../MiddleWare/multer");
const verifyToken = require("../MiddleWare/verfiyTokenAndAutorization");
const { getAllUser } = require("../Controllers/userRegisterAndLogin");
const {
  addCategory,
  getAllCategory,
} = require("../Controllers/categoryController");
const {
  addProduct,
  getAllProduct,
} = require("../Controllers/productController");

router.post("/addCategory", addCategory);
router.get("/getAllCategory", getAllCategory);
router.post("/addProduct", upload.single("productImage"), addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getAllUser/:id", verifyToken, getAllUser);

module.exports = router;
