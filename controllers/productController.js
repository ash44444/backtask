const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { name, category } = req.query;
  const query = { businessId: req.user._id };
  if (name) query.name = new RegExp(name, 'i');
  if (category) query.category = new RegExp(category, 'i');
  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      businessId: req.user._id
    });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, businessId: req.user._id },
      updates,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id, businessId: req.user._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
