import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookAppointment, getAppointmentsForDate, getAppointmentsForPatient } from "./appointmentApi";
import { toast } from "react-toastify";


// Async thunk for booking an appointment
export const bookAppointmentThunk = createAsyncThunk(
  "appointments/book",
  async ({ doctorId, patientData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await bookAppointment(doctorId, patientData);
      toast.success("Appointment booked successfully!");

      // Refetch appointments for the patient immediately after successful booking
      await dispatch(fetchAppointmentsForPatientThunk(patientData.patientId));

      return response.appointment;
    } catch (error) {
      toast.error(error.message || "Error booking appointment");
      return rejectWithValue(error.message);
    }
  }
);


// Async thunk for fetching patient appointments
export const fetchAppointmentsForPatientThunk = createAsyncThunk(
  "appointments/fetchForPatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await getAppointmentsForPatient(patientId);
      return response.appointments;
    } catch (error) {
      toast.error(error.message || "Error fetching appointments");
      return rejectWithValue(error.message);
    }
  }
);


// In appointmentSlice.js
export const fetchAppointmentsForDateThunk = createAsyncThunk(
  "appointments/fetchForDate",
  async ({ doctorId, date }, { rejectWithValue }) => {
      try {
          const response = await getAppointmentsForDate(doctorId, date);
          return { appointments: response.appointments, date }; // Return both
      } catch (error) {
          toast.error(error.message || "Error fetching appointments for date");
          return rejectWithValue(error.message);
      }
  }
);



const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    timeSlots: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Optimistically add appointment to state immediately
    addAppointmentOptimistically: (state, action) => {
      state.appointments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Booking an appointment
      .addCase(bookAppointmentThunk.pending, (state) => {
        state.status = "booking"; // Only for tracking if needed, not blocking the UI
      })
      .addCase(bookAppointmentThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        // No need to push the appointment again, it's already added optimistically
      })
      .addCase(bookAppointmentThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Optionally, handle rollback here if the booking failed
      })
      // Fetching appointments for a patient
      .addCase(fetchAppointmentsForPatientThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointmentsForPatientThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload; // Set appointments for the patient
      })
      .addCase(fetchAppointmentsForPatientThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAppointmentsForDateThunk.fulfilled, (state, action) => {
        // Access the appointments from the payload
        const bookedSlots = action.payload.appointments.map(app => app.timeSlot);
        const updatedSlots = state.timeSlots.filter(slot => bookedSlots.filter(b => b === slot).length < 5);
        state.timeSlots = updatedSlots; // Update time slots based on current bookings
    });    
  },
});

export const { addAppointmentOptimistically } = appointmentSlice.actions;
export default appointmentSlice.reducer;


