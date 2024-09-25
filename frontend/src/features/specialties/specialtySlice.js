import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSpecialties, getSpecialtyById, createSpecialty } from './specialtyApi';

// Thunks
export const fetchSpecialtiesThunk = createAsyncThunk('/specialties/fetchSpecialties', async () => {
  try {
    const specialties = await getSpecialties();
    return specialties;
  } catch (error) {
    return error.message;
  }
});

export const fetchSpecialtyByIdThunk = createAsyncThunk('/specialties/fetchSpecialtyById', async (specialtyId) => {
  try {
    const specialty = await getSpecialtyById(specialtyId);
    return specialty;
  } catch (error) {
    return error.message;
  }
});

export const createSpecialtyThunk = createAsyncThunk('/specialties/createSpecialty', async (specialtyData) => {
  try {
    const specialty = await createSpecialty(specialtyData);
    return specialty;
  } catch (error) {
    return error.message;
  }
});

// Slice
const specialtySlice = createSlice({
  name: 'specialty',
  initialState: {
    specialties: [],
    specialty: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialtiesThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(fetchSpecialtiesThunk.fulfilled, (state, action) => {
        state.status = 'Success';
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialtiesThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.payload;
      })
      .addCase(fetchSpecialtyByIdThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(fetchSpecialtyByIdThunk.fulfilled, (state, action) => {
        state.status = 'Success';
        state.specialty = action.payload;
      })
      .addCase(fetchSpecialtyByIdThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.payload;
      })
      .addCase(createSpecialtyThunk.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(createSpecialtyThunk.fulfilled, (state, action) => {
        state.status = 'Success';
        state.specialties.push(action.payload);
      })
      .addCase(createSpecialtyThunk.rejected, (state, action) => {
        state.status = 'Failed';
        state.error = action.payload;
      });
  },
});

export default specialtySlice.reducer;
