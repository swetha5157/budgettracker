const transactionService = require('../services/transactionService');
const category = require("../services/categoryService")

const createTransaction = async (req, res) => {
  try {
    const data = req.body;

    // Try finding the existing category first
    let curCategory = await category.findCategory(data.categoryName, data.categoryType, data.userId);

    // If category doesn't exist, create it
    if (!curCategory) {
      curCategory = await category.createCategory({
        name: data.categoryName,
        type: data.categoryType,
        userId: data.userId,
      });
    }

    const formattedData = {
      amount: data.amount,
      date: data.date,
      categoryId: curCategory._id,
      userId: data.userId,
    };


    const transaction = await transactionService.createTransaction(formattedData);


    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
};

const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactionsByUser(req.params.userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
};


const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionService.updateTransaction(req.params.id, req.body);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error });
  }
};


const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(req.params.id);
    res.status(200).json({ message : 'Deleted the transaction successfully'});
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransaction,
  deleteTransaction,
};
