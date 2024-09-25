import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { bookAppointment, getAppointmentsByDoctor, getDoctor, getDoctorsBySpecialties, getFeaturedDoctors } from './doctorApi';


export const getDoctorsBySpecialtiesThunk = createAsyncThunk('/doctors/fetchDoctorsBySpecialty', async (specialtyId) => {
  try {
      const doctors = await getDoctorsBySpecialties(specialtyId);
      return doctors;
  } catch (error) {
      return (error.message);
  }
});


export const getFeaturedDoctorsThunk = createAsyncThunk('/doctors/fetchFeatured', async () => {
    try {
        const featuredDoctors = await getFeaturedDoctors();
        return featuredDoctors;
    } catch (error) {
        return (error.message);
    }
})

export const bookAppointmentThunk = createAsyncThunk(
    '/doctors/bookAppointment',
    async ({ doctorId, patientData }, { rejectWithValue }) => {
      try {
        const appointment = await bookAppointment(doctorId, patientData);
        return appointment;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const getDoctorDetailsThunk = createAsyncThunk(
    '/doctors/fetchDoctorDetails',
    async (doctorId) => {
      try {
        const response = await getDoctor(doctorId);
        return response; // Return the whole doctor object
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  
  // Create a thunk for fetching doctor appointments
export const getAppointmentsByDoctorThunk = createAsyncThunk(
  '/doctors/fetchAppointmentsByDoctor',
  async (doctorId, { rejectWithValue }) => {
      try {
          const appointments = await getAppointmentsByDoctor(doctorId);
          return appointments;
      } catch (error) {
          return rejectWithValue(error.message);
      }
  }
);

  


  const doctorSlice = createSlice({
    name: 'Doctor',
    initialState: {
      featuredDoctors: [],
      specialties: [],
      doctors: [],
      appointments: [],
      doctor: null,
      status: 'idle',
      error: null,
      appointmentStatus: 'idle', // Track appointment status
      appointmentError: null,    // Track appointment error
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getDoctorsBySpecialtiesThunk.pending, (state) => {
          state.status = 'Loading';
        })
        .addCase(getDoctorsBySpecialtiesThunk.fulfilled, (state, action) => {
          state.status = 'Success';
          state.doctors = action.payload;
        })
        .addCase(getDoctorsBySpecialtiesThunk.rejected, (state, action) => {
          state.status = 'Failed';
          state.error = action.payload;
        })
        .addCase(getFeaturedDoctorsThunk.pending, (state) => {
          state.status = 'Loading';
        })
        .addCase(getFeaturedDoctorsThunk.fulfilled, (state, action) => {
          state.status = 'Success';
          state.featuredDoctors = action.payload;
        })
        .addCase(getFeaturedDoctorsThunk.rejected, (state, action) => {
          state.status = 'Failed';
          state.error = action.payload;
        })
        .addCase(getDoctorDetailsThunk.pending, (state) => {
          state.status = 'Loading';
        })
        .addCase(getDoctorDetailsThunk.fulfilled, (state, action) => {
          state.status = 'Success';
          state.doctor = action.payload;
        })
        .addCase(getDoctorDetailsThunk.rejected, (state, action) => {
          state.status = 'Failed';
          state.error = action.payload;
        })
        .addCase(getAppointmentsByDoctorThunk.pending, (state) => {
          state.status = 'Loading';
      })
      .addCase(getAppointmentsByDoctorThunk.fulfilled, (state, action) => {
          state.status = 'Success';
          state.appointments = action.payload; // Store the fetched appointments
      })
      .addCase(getAppointmentsByDoctorThunk.rejected, (state, action) => {
          state.status = 'Failed';
          state.error = action.payload;
      });
    },
  });
  
export default doctorSlice.reducer;



