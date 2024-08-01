const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    name:{type: String, required: true},
    specialty: {type: String, required: true},
    specialtyDescription: {type: String, required: true},
    qualification: {type: String, required: true},
    experience: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    profileImage: {type: String},
    availability:{
        days:[{type:String}],
        hours:[{type:String}]
    },
    clinic: {
        name: { type: String },
        address: {
          street: { type: String },
          city: { type: String },
          state: { type: String },
          country: { type: String },
          zipCode: { type: String }
        },
        contactNumber: { type: String }
      },
},{timestamps:true})

module.exports = mongoose.model("Doctor",doctorSchema)