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
const {
  addItemCart,
  getAllCartData,
  getCartDataOfUser,
} = require("../Controllers/cartController");
router.post("/addCategory", addCategory);
router.get("/getAllCategory", getAllCategory);
router.post("/addProduct", upload.single("productImage"), addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getAllUser/:id", verifyToken, getAllUser);
router.post("/addItemCart", addItemCart);
router.get("/getAllCartData", getAllCartData);
router.get("/getCartDataOfUser", getCartDataOfUser);
module.exports = router;
