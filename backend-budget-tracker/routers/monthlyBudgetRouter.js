const express = require('express');
const router = express.Router();
const monthlyBudgetController = require('../controllers/monthlyBudgetController');

router.post('/', monthlyBudgetController.createMonthlyBudget);
router.get('/:userId', monthlyBudgetController.getMonthlyBudgetByUser);
router.get('/monthly/:userId', monthlyBudgetController.getMonthlyBudget);
router.put('/:id', monthlyBudgetController.updateMonthlyBudget);
router.delete('/:id', monthlyBudgetController.deleteMonthlyBudget);
router.get('/get/:id',monthlyBudgetController.getBudgetById);

module.exports = router;
