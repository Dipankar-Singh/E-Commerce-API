const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

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

module.exports = router;
