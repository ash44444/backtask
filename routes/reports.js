const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getInventory,
  getTransactionsReport
} = require('../controllers/reportController');

router.use(protect);

router.get('/inventory', getInventory);
router.get('/transactions', getTransactionsReport);

module.exports = router;
