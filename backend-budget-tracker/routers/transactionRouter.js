const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../auth/auth');

router.post('/',authMiddleware, transactionController.createTransaction);
router.get('/', authMiddleware,transactionController.getTransactionsByUser);
router.put('/:id',authMiddleware, transactionController.updateTransaction);
router.delete('/:id',authMiddleware, transactionController.deleteTransaction);

module.exports = router;
