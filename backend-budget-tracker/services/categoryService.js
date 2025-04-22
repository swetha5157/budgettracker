const Category = require('../models/categoryModel');

const createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

const getCategoriesByUser = async (userId) => {
  return await Category.find({ userId });
};

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const findCategory = async(name,type,userId) => {
  return await Category.findOne({name,type,userId});
};

const updateCategory = async (categoryId, data) => {
  return await Category.findByIdAndUpdate(categoryId, data, { new: true });
};

const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  createCategory,
  getCategoriesByUser,
  getCategoryById,
  updateCategory,
  deleteCategory,
  findCategory
};
