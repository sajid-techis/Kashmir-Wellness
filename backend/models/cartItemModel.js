const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 0 },
    priceAtTimeOfAddition: { type: Number, required: true },
    
},{timestamps: true});

module.exports = cartItemSchema;
