import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeaturedLabs, getLabs } from "./labsApi";


export const getLabsThunk = createAsyncThunk('/labs/get',async (filters,{rejectWithValue}) => {
    try {
        const labs = await getLabs(filters)
        return labs;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getFeaturedLabsThunk = createAsyncThunk('labs/featured', async() => {
    try {
        const featuredLabs = await getFeaturedLabs()
        return featuredLabs;
    } catch (error) {
        return (error.message)
    }
})



const labsSlice = createSlice({
    name: "Labs",
    initialState:{
        labs:[],
        featuredLabs:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getLabsThunk.pending,(state) => {
            state.status = "Pending"
        })
        .addCase(getLabsThunk.fulfilled,(state,action) => {
            state.status = "Success"
            state.labs = action.payload
        })
        .addCase(getLabsThunk.rejected,(state,action) => {
            state.status = "Failed"
            state.error = action.payload
        })
        .addCase(getFeaturedLabsThunk.pending,(state) => {
            state.status = "Pending"
        })
        .addCase(getFeaturedLabsThunk.fulfilled,(state,action) => {
            state.status = "Success"
            state.featuredLabs = action.payload;
        })
        .addCase(getFeaturedLabsThunk.rejected,(state,action) => {
            state.status = "Failed"
            state.error = action.payload;
        })
    }
})

export default labsSlice.reducer;