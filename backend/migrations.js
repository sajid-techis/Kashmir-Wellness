const mongoose = require('mongoose');
const Doctor = require('./models/doctorModel');
const Specialty = require('./models/specialtyModel');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function migrateSpecialties() {
  try {
    const doctors = await Doctor.find().lean();

    for (const doctor of doctors) {
      console.log('Doctor Document:', JSON.stringify(doctor, null, 2));

      // Ensure specialty is a string
      if (typeof doctor.specialty !== 'string' || !doctor.specialtyDescription) {
        console.log(`Skipping doctor without valid specialty: ${doctor.name}`);
        continue; // Skip to the next doctor
      }

      const specialtyName = doctor.specialty;
      console.log(`Processing doctor: ${doctor.name}, Specialty: ${specialtyName}`);

      // Check if the specialty already exists
      let specialty = await Specialty.findOne({ name: specialtyName });

      // If not, create it
      if (!specialty) {
        specialty = new Specialty({
          name: specialtyName,
          description: doctor.specialtyDescription
        });
        await specialty.save();
        console.log(`Created new specialty: ${specialty.name}`);
      } else {
        console.log(`Specialty already exists: ${specialty.name}`);
      }

      // Update the doctor to reference the Specialty document
      await Doctor.updateOne(
        { _id: doctor._id },
        { specialty: specialty._id, specialtyDescription: undefined }
      );
      console.log(`Updated doctor: ${doctor.name}, New Specialty ID: ${specialty._id}`);
    }

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error.message);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

migrateSpecialties();
