import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookAppointment, getAppointmentsForPatient } from "./appointmentApi";
import { toast } from "react-toastify";

// Async thunk for booking an appointment
export const bookAppointmentThunk = createAsyncThunk(
  "appointments/book",
  async ({ doctorId, patientData }, { rejectWithValue }) => {
    try {
      const response = await bookAppointment(doctorId, patientData);
      toast.success("Appointment booked successfully!");
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

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Booking an appointment
      .addCase(bookAppointmentThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookAppointmentThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments.push(action.payload); // Add the booked appointment to the state
      })
      .addCase(bookAppointmentThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
      });
  },
});

export default appointmentSlice.reducer;
