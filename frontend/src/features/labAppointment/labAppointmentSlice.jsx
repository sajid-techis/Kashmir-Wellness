import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLabAppointments, createLabAppointment } from "./labAppointmentApi";

// Thunk for getting lab appointments by patientId
export const getLabAppointmentsThunk = createAsyncThunk(
    'labAppointments/getByPatient',
    async (patientId, { rejectWithValue }) => {
        try {
            const appointments = await getLabAppointments(patientId);
            return appointments;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk for creating a new lab appointment
export const createLabAppointmentThunk = createAsyncThunk(
    'labAppointments/create',
    async (appointmentData, { rejectWithValue }) => {
        try {
            const newAppointment = await createLabAppointment(appointmentData);
            return newAppointment;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const labAppointmentsSlice = createSlice({
    name: "labAppointments",
    initialState: {
        appointments: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLabAppointmentsThunk.pending, (state) => {
                state.status = "Pending";
            })
            .addCase(getLabAppointmentsThunk.fulfilled, (state, action) => {
                state.status = "Success";
                state.appointments = action.payload;
            })
            .addCase(getLabAppointmentsThunk.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })
            .addCase(createLabAppointmentThunk.pending, (state) => {
                state.status = "Pending";
            })
            .addCase(createLabAppointmentThunk.fulfilled, (state, action) => {
                state.status = "Success";
                state.appointments.push(action.payload); 
            })
            .addCase(createLabAppointmentThunk.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            });
    }
});

export default labAppointmentsSlice.reducer;
