import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryApi";

export const getCategoriesThunk = createAsyncThunk(
  "/categories/get",
  async (filters, { rejectWithValue }) => {
    try {
      const categories = await getCategories(filters);
      return categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    categories: [],
    status: 'idle',
    error: null
};

const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategoriesThunk.pending, (state) => {
            state.status = "Loading";
        })
        .addCase(getCategoriesThunk.fulfilled, (state, action) => {
            state.status = "Success";
            state.categories = action.payload;
        })
        .addCase(getCategoriesThunk.rejected, (state, action) => {
            state.status = "Failed";
            state.error = action.payload;
        });
    }
});

export default categorySlice.reducer;
