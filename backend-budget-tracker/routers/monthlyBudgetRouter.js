const express = require('express');
const router = express.Router();
const monthlyBudgetController = require('../controllers/monthlyBudgetController');
const authMiddleware = require('../auth/auth');

router.post('/', authMiddleware,monthlyBudgetController.createMonthlyBudget);
router.get('/', authMiddleware,monthlyBudgetController.getMonthlyBudgetByUser);
router.get('/monthly',authMiddleware, monthlyBudgetController.getMonthlyBudget);
router.put('/:id', authMiddleware,monthlyBudgetController.updateMonthlyBudget);
router.delete('/:id',authMiddleware, monthlyBudgetController.deleteMonthlyBudget);
router.get('/get/:id',authMiddleware,monthlyBudgetController.getBudgetById);

module.exports = router;
