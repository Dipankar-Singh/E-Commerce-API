const category = require("../Models/categorySchema");
const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName || !categoryDescription) {
      return res.status(404).json({ msg: `Necessary Data is missing` });
    }
    const adding = new category({
      categoryName,
      categoryDescription,
    });
    await adding.save();
    return res.status(200).json({ msg: "Category Added Successfully" });
  } catch (error) {
    return res.status(500).json(`Internal Server Error ${error}`);
  }
};
const getAllCategory = async (_, res) => {
  try {
    const allCategory = await category.find();
    return res.status(200).json(allCategory);
  } catch (error) {
    return res.status(500).json(`Internal Server Error ${error}`);
  }
};
module.exports = { addCategory, getAllCategory };
