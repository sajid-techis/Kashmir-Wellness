const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

// Generate time slots for the given start and end times
const generateTimeSlots = (startTime, endTime, interval = 20) => {
    const slots = [];
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    while (start < end) {
        const nextStart = new Date(start);
        const nextEnd = new Date(start.setMinutes(start.getMinutes() + interval));

        slots.push({
            start: nextStart.toTimeString().split(' ')[0].slice(0, 5),
            end: nextEnd.toTimeString().split(' ')[0].slice(0, 5)
        });
    }

    return slots;
};

// Book an appointment
router.post("/:doctorId/book-appointment", async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { patientId, date, timeSlot, patientName, email, phoneNumber } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await User.findById(patientId);

        if (!doctor || !patient) {
            return res.status(404).json({ message: "Doctor or Patient Not Found" });
        }

        // Check if the time slot is already booked
        const isSlotBooked = await Appointment.findOne({
            doctorId,
            date,
            timeSlot,
        });
        if (isSlotBooked) {
            return res.status(400).json({ message: "Time Slot Already Booked" });
        }

        // Check available slots for the given day
        const availability = doctor.availability.find(day => day.day === new Date(date).toLocaleDateString('en-EN', { weekday: 'long' }));
        if (!availability) {
            return res.status(400).json({ message: "Doctor is not available on this day" });
        }

        const availableSlots = [];
        availability.slots.forEach(slot => {
            const slots = generateTimeSlots(slot.start, slot.end);
            availableSlots.push(...slots);
        });

        const selectedSlot = availableSlots.find(slot => slot.start === timeSlot);
        if (!selectedSlot) {
            return res.status(400).json({ message: "Time Slot Not Available" });
        }

        // Create the new appointment
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            date,
            timeSlot,
            patientName,
            email,
            phoneNumber,
        });

        await newAppointment.save();

        doctor.appointments.push(newAppointment._id);
        patient.appointments.push(newAppointment._id);

        await doctor.save();
        await patient.save();

        res.status(200).json({
            message: "Appointment Booked Successfully",
            appointment: newAppointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error In Booking Appointment",
            error: error.message,
        });
    }
});

// Get appointments for a doctor
router.get("/:doctorId/appointments", async (req, res) => {
    try {
        const { doctorId } = req.params;
        const appointments = await Appointment.find({ doctorId })
            .populate({
                path: "patientId",
                select: "name email phoneNumber",
            })
            .populate("doctorId");

        res.status(200).json({
            message: "Appointments Retrieved Successfully",
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error In Finding Appointments",
            error: error.message,
        });
    }
});

// Get appointments for a patient
router.get("/patients/:patientId/appointments", async (req, res) => {
    try {
        const { patientId } = req.params;
        const appointments = await Appointment.find({ patientId }).populate("doctorId");

        res.status(200).json({
            message: "Appointments Retrieved Successfully",
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error In Finding Appointments",
            error: error.message,
        });
    }
});

// Update appointment status
router.put("/:doctorId/appointments/:appointmentId", async (req, res) => {
    try {
        const { doctorId, appointmentId } = req.params;
        const { status } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            message: "Appointment status updated successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating appointment status",
            error: error.message,
        });
    }
});

// Delete an appointment
router.delete('/:appointmentId', async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Find the appointment and associated references
        const appointment = await Appointment.findById(appointmentId).populate('doctorId').populate('patientId');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Remove the appointment from the user's and doctor's records
        await User.findByIdAndUpdate(appointment.patientId, {
            $pull: { appointments: appointmentId }
        });

        await Doctor.findByIdAndUpdate(appointment.doctorId, {
            $pull: { appointments: appointmentId }
        });

        // Delete the appointment
        await Appointment.findByIdAndDelete(appointmentId);

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
});

module.exports = router;
