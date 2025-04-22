const MonthlyBudget = require('../models/monthlyBudgetModel');

const createMonthlyBudget = async (data) => {
  const monthlyBudget = new MonthlyBudget(data);
  return await monthlyBudget.save();
};

const getMonthlyBudgetByUser = async (userId) => {
  return await MonthlyBudget.find({ userId }).sort({ year: 1, month: 1 }).populate('categories.category');
};

const getMonthlyBudget = async (userId)=>{
    const month = new Date().getMonth() + 1;
    return await MonthlyBudget.findOne({userId,month : `${month}`}).populate('categories.category');
}

const getBudgetById = async (id)=>{
  return await MonthlyBudget.findById(id).populate('categories.category');
}

const updateMonthlyBudget = async (budgetId, data) => {
  return await MonthlyBudget.findByIdAndUpdate(budgetId, data, { new: true });
};

const deleteMonthlyBudget = async (budgetId) => {
  return await MonthlyBudget.findByIdAndDelete(budgetId);
};

module.exports = {
  createMonthlyBudget,
  getMonthlyBudgetByUser,
  updateMonthlyBudget,
  deleteMonthlyBudget,
  getMonthlyBudget,
  getBudgetById
};
