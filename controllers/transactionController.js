const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const { calculateTotal } = require('../utils/helper');

exports.getTransactions = async (req, res) => {
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

exports.addTransaction = async (req, res) => {
  const { type, customerId, vendorId, products } = req.body;
  try {
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findOne({ _id: item.productId, businessId: req.user._id });
        if (!product) throw new Error('Product not found');

        if (type === 'sale' && product.stock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        // Adjust stock
        product.stock += type === 'sale' ? -item.quantity : item.quantity;
        await product.save();

        return {
          productId: product._id,
          quantity: item.quantity,
          price: product.price
        };
      })
    );

    const totalAmount = calculateTotal(productDetails);

    const transaction = new Transaction({
      type,
      customerId: type === 'sale' ? customerId : null,
      vendorId: type === 'purchase' ? vendorId : null,
      products: productDetails,
      totalAmount,
      businessId: req.user._id
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction recorded', transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
