const mongoose = require('mongoose');

const labsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city:{type: String, required: true},
    state: {type: String, required: true},
    imageUrl: {type: String},
    pinCode: {type: String, required: true},
    contactNumber: {type: String, required: true},
    testsAvailable: [
        {type: String, required:true}
    ],
    openingHours: {
        days: {
          type: [String],
          required: true,
        },
        hours: {
          type: [String],
          required: true,
        },
      }

},{timestamps:true})

module.exports = mongoose.model("Labs",labsSchema);