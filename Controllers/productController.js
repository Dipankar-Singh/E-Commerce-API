const Product = require("../Models/productSchema");

const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, categoryId } = req.body;
    const productImage = req.file?.path;

    if (!productName || !categoryId) {
      return res.status(400).json({ msg: "Necessary Data is missing" });
    }

    const creatingProduct = new Product({
      productImage,
      productName,
      productDescription,
      categoryId,
    });

    await creatingProduct.save();
    return res.status(200).json({ msg: "Product Added Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Internal Server Error ${error.message}` });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find().populate({
      path: "categoryId",
      select: "_id categoryName",
    });

    return res.status(200).json(listOfProducts);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Internal Server Error ${error.message}` });
  }
};

module.exports = { addProduct, getAllProduct };
