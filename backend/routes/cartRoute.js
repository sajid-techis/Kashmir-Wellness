const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const authenticate = require('../middleware/authenticate');

// Add Cart
router.post('/add', authenticate, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                priceAtTimeOfAddition: product.price
            });
        }

        cart.total += product.price * quantity;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update cart 
// Update cart 
router.put('/update', authenticate, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            const oldQuantity = cart.items[itemIndex].quantity;
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
                cart.total += cart.items[itemIndex].priceAtTimeOfAddition * (quantity - oldQuantity);
            } else {
                cart.total -= cart.items[itemIndex].priceAtTimeOfAddition * oldQuantity;
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Remove 
router.delete('/remove', authenticate, async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            cart.total -= item.priceAtTimeOfAddition * item.quantity;
            cart.items.splice(itemIndex, 1);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cart.save();
        res.status(200).json({ 
            message: 'Product removed successfully', 
            cart: {
                items: cart.items,
                total: cart.total
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





// Get cart items
router.get('/', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
