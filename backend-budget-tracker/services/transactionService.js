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

const getTransactionByMonth = async (startDate,endDate) => {
  return await Transaction.find({
    userId : "65f025cfc3c561182e843dc0",
    date: { $gte: startDate, $lt: endDate }}).populate('categoryId');  
};

const updateTransaction = async (transactionId, data) => {
  return await Transaction.findByIdAndUpdate(transactionId, data, { new: true });
};

const deleteTransaction = async (transactionId, userId) => {
  return await Transaction.findOneAndDelete({ _id: transactionId, userId });
};


module.exports = {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionByMonth
};
