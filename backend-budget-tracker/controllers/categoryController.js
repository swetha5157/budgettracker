const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    console.log(req.body);
    
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

const getCategoriesByUser = async (req, res) => {
  try {
    const categories = await categoryService.getCategoriesByUser(req.params.userId);
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching categories', error });
  }
};

const updateCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ message:"Category Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error });
  }
};

module.exports = {
  createCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
};
