const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get user cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { products: [] });
});

// Add product to cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });

  if (cart) {
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  } else {
    cart = new Cart({ userId, products: [{ productId, quantity }] });
  }

  await cart.save();
  res.json(cart);
});

// Remove product from cart
router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
  }

  res.json(cart || { products: [] });
});

module.exports = router;
