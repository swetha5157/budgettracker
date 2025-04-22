const monthlyBudgetService = require('../services/monthlyBudgetService');


const createMonthlyBudget = async (req, res) => {
  try {
    var data = req.body;
    data['userId'] = req.user.userId;
    const monthlyBudget = await monthlyBudgetService.createMonthlyBudget(data);
    res.status(201).json(monthlyBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error creating monthly budget', error });
  }
};


const getMonthlyBudgetByUser = async (req, res) => {
  try {
    const monthlyBudget = await monthlyBudgetService.getMonthlyBudgetByUser(req.user.userId);
    res.status(200).json(monthlyBudget===null?{}:monthlyBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching monthly budget', error });
  }
};

const getMonthlyBudget = async (req, res) => {
  try {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const monthlyBudget = await monthlyBudgetService.getMonthlyBudget(req.user.userId,month,year);
    console.log("Monthly Budget : ",monthlyBudget);
    
    res.status(200).json(monthlyBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching monthly budget', error });
  }
};


const updateMonthlyBudget = async (req, res) => {
  try {
    const updatedMonthlyBudget = await monthlyBudgetService.updateMonthlyBudget(req.params.id, req.body);
    res.status(200).json(updatedMonthlyBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error updating monthly budget', error });
  }
};

const getBudgetById = async (req,res) =>{
  try {
    const response = await monthlyBudgetService.getBudgetById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Error in fetch data', error });
  }
}


const deleteMonthlyBudget = async (req, res) => {
  try {
    const deletedMonthlyBudget = await monthlyBudgetService.deleteMonthlyBudget(req.params.id,req.user.userId);
    res.status(200).json(deletedMonthlyBudget);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting monthly budget', error });
  }
};

module.exports = {
  createMonthlyBudget,
  getMonthlyBudgetByUser,
  updateMonthlyBudget,
  deleteMonthlyBudget,
  getMonthlyBudget,
  getBudgetById
};
