const cart = require("../Models/cartSchema");
const addItemCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(404).json({ msg: "Necessary Elements Are Missing" });
    }
    const cartData = new cart({
      userId,
      productId,
      quantity,
    });
    await cartData.save();
    return res.status(200).json({ msg: "Item Added Successfully" });
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
const getAllCartData = async (_, res) => {
  try {
    const getallData = await cart
      .find()
      .populate({
        path: "userId",
        select: "userName _id",
      })
      .populate({
        path: "productId",
        select: "_id productName productImage",
      });
    const formattedData = getallData.map((item) => ({
      cartId: item._id,
      userId: item.userId._id,
      userName: item.userId.userName,
      productId: item.productId._id,
      productName: item.productId.productName,
      image: item.productId.productImage,
      quantity: item.quantity,
    }));
    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
const getCartDataOfUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getallData = await cart
      .find({ id })
      .populate({
        path: "userId",
        select: "userName _id",
      })
      .populate({
        path: "productId",
        select: "_id productName productImage",
      });
    return res.status(200).json(getallData);
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error ${error}` });
  }
};
module.exports = { addItemCart, getAllCartData, getCartDataOfUser };
