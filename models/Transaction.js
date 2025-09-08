const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['sale', 'purchase'] },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  date: { type: Date, default: Date.now },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Transaction', transactionSchema);
