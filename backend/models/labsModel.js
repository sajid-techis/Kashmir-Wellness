const mongoose = require('mongoose');

const generateTimeSlots = (openingHours) => {
  const slots = [];

  if (!openingHours || !openingHours.hours || openingHours.hours.length === 0) {
      return slots; 
  }

  // Use the first entry in the hours array
  const [startHour, endHour] = openingHours.hours[0].split(' - ').map(time => time.trim());

  // Convert to 24-hour format for parsing
  const convertTo24Hour = (time) => {
      const [timePart, modifier] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) {
          hours += 12; // Convert PM hours
      } else if (modifier === 'AM' && hours === 12) {
          hours = 0; // Midnight case
      }
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // Return in HH:MM format
  };

  // Format for Date parsing
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Convert start and end times to 24-hour format
  const start24 = convertTo24Hour(startHour);
  const end24 = convertTo24Hour(endHour);


  // Convert to Date objects
  const start = new Date(`${currentDate}T${start24}:00`);
  const end = new Date(`${currentDate}T${end24}:00`);

  // Check if start and end are valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return slots; // Return empty slots if dates are invalid
  }

  // Generate hourly slots
  while (start <= end) {
      const slot = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(slot);
      start.setHours(start.getHours() + 1);
  }

  return slots;
};




const labsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    imageUrl: { type: String },
    pinCode: { type: String, required: true },
    contactNumber: { type: String, required: true },
    testsAvailable: [
        { type: String, required: true }
    ],
    openingHours: {
        days: { type: [String], required: true },
        hours: { type: [String], required: true },
    },
    timeSlots: {
        type: [String],
        required: true,
        default: function () {
            return generateTimeSlots(this.openingHours);
        }
    }
}, { timestamps: true });

module.exports = { Lab: mongoose.model("Labs", labsSchema), generateTimeSlots };
