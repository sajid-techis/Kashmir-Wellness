import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getDoctorsBySpecialties, getFeaturedDoctors, getSpecialties } from './doctorApi';

export const getSpecialtiesThunk = createAsyncThunk('/doctors/fetchSpecialties', async () => {
    try {
        const specialties = await getSpecialties();
        return specialties;
    } catch (error) {
        return (error.message);
    }
})

export const getDoctorsBySpecialtiesThunk = createAsyncThunk('/doctors/fetchDoctorsBySpecialty', async (specialty) => {
    try {
        const doctors = await getDoctorsBySpecialties(specialty);
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


const doctorSlice = createSlice({
    name: 'Doctor',
    initialState: {
        featuredDoctors: [],
        specialties: [],
        doctors:[],
        status: 'idle',
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getSpecialtiesThunk.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(getSpecialtiesThunk.fulfilled,(state,action) => {
            state.status = "Success"
            state.specialties = action.payload
        })
        .addCase(getSpecialtiesThunk.rejected,(state,action) => {
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getDoctorsBySpecialtiesThunk.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(getDoctorsBySpecialtiesThunk.fulfilled,(state,action) => {
            state.status ="Success"
            state.doctors = action.payload;
        })
        .addCase(getDoctorsBySpecialtiesThunk.rejected,(state,action) => {
            state.status = "Failed"
            state.error = action.payload;
        })
        .addCase(getFeaturedDoctorsThunk.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(getFeaturedDoctorsThunk.fulfilled,(state,action) => {
            state.status = "Success"
            state.featuredDoctors = action.payload;
        })
        .addCase(getFeaturedDoctorsThunk.rejected,(state,action) => {
            state.status = "Failed"
            state.error = action.payload;
        })
    }
})

export default doctorSlice.reducer;



