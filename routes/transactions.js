const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getTransactions,
  addTransaction
} = require('../controllers/transactionController');

router.use(protect);

router.get('/', getTransactions);
router.post('/', addTransaction);

module.exports = router;
