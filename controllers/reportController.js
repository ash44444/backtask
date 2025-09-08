const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find({ businessId: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTransactionsReport = async (req, res) => {
  const { type, startDate, endDate } = req.query;
  const query = { businessId: req.user._id };
  if (type) query.type = type;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }
  try {
    const transactions = await Transaction.find(query).populate('products.productId');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
