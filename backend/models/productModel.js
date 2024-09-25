const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    stock: {type: String, required: true},
    expirationDate: {type: Date, required: true},
    prescriptionRequired: {type: Boolean, required: true},
    imageUrl: [{type: String}], 
    ratings: {
        averageRating: { type: Number, default: 0 },
        numberOfRatings: { type: Number, default: 0 }
    }
}, {timestamps: true});


module.exports = mongoose.model('Product',productSchema)