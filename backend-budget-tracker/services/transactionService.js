const Transaction = require('../models/transactionModel');

const createTransaction = async (data) => {
  const transaction = new Transaction(data);
  return await transaction.save();
};

const getTransactionsByUser = async (userId) => {
  return await Transaction.find({ userId }).populate('categoryId');
};

const getTransactionById = async (transactionId) => {
  return await Transaction.findById(transactionId).populate('categoryId');  
};

const updateTransaction = async (transactionId, data) => {
  return await Transaction.findByIdAndUpdate(transactionId, data, { new: true });
};

const deleteTransaction = async (transactionId) => {
  return await Transaction.findByIdAndDelete(transactionId);
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
