const { Cart, Product } = require('../models/product');  

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    const cartItem = await Cart.create({ productId, quantity, userId });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.query.userId;  
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }]
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id } });
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

// Purchase items in the cart
exports.purchaseItems = async (req, res) => {
  try {
    const userId = req.body.userId;

    await Cart.destroy({ where: { userId } });  // Clear the cart
    res.status(200).json({ message: 'Purchase successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete purchase' });
  }
};
