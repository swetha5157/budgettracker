const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../auth/auth');

router.post('/',authMiddleware, categoryController.createCategory);
router.get('/',authMiddleware, categoryController.getCategoriesByUser);
router.put('/:id',authMiddleware, categoryController.updateCategory);
router.delete('/:id',authMiddleware, categoryController.deleteCategory);

module.exports = router;
