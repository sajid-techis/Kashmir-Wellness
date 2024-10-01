const mongoose = require('mongoose');

const labAppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Labs', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  patientName: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  tests: { type: [String], required: true } // Add this line for tests
}, { timestamps: true });

const LabAppointment = mongoose.model('LabAppointment', labAppointmentSchema);

module.exports = LabAppointment;
