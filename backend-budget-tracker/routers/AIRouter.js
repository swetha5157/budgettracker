const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

const AIController = require('../controllers/AIController');

router.get('/',auth,AIController.analysisAI);

module.exports = router;