const mongoose = require('mongoose');

// Batch Schema
const batchSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  manufacturingDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
}, { _id: false });

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String, required: true },
  prescriptionRequired: { type: Boolean, required: true },
  imageUrl: [{ type: String }],
  ratings: {
    averageRating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 }
  },
  batches: [batchSchema] // Store price, stock, and expiration in batches
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
