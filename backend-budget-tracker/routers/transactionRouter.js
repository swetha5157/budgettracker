const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/', transactionController.createTransaction);
router.get('/:userId', transactionController.getTransactionsByUser);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
