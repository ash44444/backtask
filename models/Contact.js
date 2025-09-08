const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  type: { type: String, enum: ['customer', 'vendor'] },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Contact', contactSchema);
