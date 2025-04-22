const express = require('express');
const router = express.Router();
const analysisContoller = require('../controllers/analysisController');
const authMiddleware = require('../auth/auth');


router.get('/',authMiddleware, analysisContoller.generatePDF);

module.exports = router;