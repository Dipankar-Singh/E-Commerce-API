const Product = require("../Models/productSchema");
const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, categoryId, productPrice } =
      req.body;
    const productImage = req.file?.path;

    if (!productName || !categoryId || !productPrice) {
      return res.status(400).json({ msg: "Necessary Data is missing" });
    }

    const creatingProduct = new Product({
      productImage,
      productName,
      productPrice,
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

    const formattedData = listOfProducts.map((item) => ({
      productId: item._id,
      categoryId: item.categoryId._id,
      categoryName: item.categoryId.categoryName,
      productImage: item.productImage,
      productPrice: item.productPrice,
      productName: item.productName,
      productDescription: item.productDescription,
    }));
    return res.status(200).json(formattedData);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Internal Server Error ${error.message}` });
  }
};
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ msg: "Internal Server Error" });
    }
    const data = await Product.find({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Internal Server Error ${error.message}` });
  }
};
module.exports = { addProduct, getAllProduct, getProductById };
