const calculateTotal = (products) => {
  return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

module.exports = { calculateTotal };
