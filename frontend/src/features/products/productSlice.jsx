// features/products/productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductDetails, getFeaturedProducts } from "./productApi";

export const getProductsThunk = createAsyncThunk('/products/get', async ({ categoryId}, { rejectWithValue }) => {
    try {
        const products = await getProducts(categoryId);
        return products;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const getFeaturedProductsThunk = createAsyncThunk('/products/getFeatured', async () => {
    try {
        const featuredProducts = await getFeaturedProducts();
        return featuredProducts
    } catch (error) {
        return (error.message)
    }
})

export const getProductDetailsThunk = createAsyncThunk('/product/details', async (id, { rejectWithValue }) => {
    try {
        const product = await getProductDetails(id);
        return product;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    products: [],
    featuredProducts: [],
    product: null,
    status: 'idle',
    error: null
};

const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {
                state.status = "Success";
                state.products = action.payload;
            })
            .addCase(getProductsThunk.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })
            .addCase(getProductDetailsThunk.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(getProductDetailsThunk.fulfilled, (state, action) => {
                state.status = "Success";
                state.product = action.payload;
            })
            .addCase(getProductDetailsThunk.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })
            .addCase(getFeaturedProductsThunk.pending,(state) => {
                state.status = "Pending"
            })
            .addCase(getFeaturedProductsThunk.fulfilled,(state,action) => {
                state.status = "Success";
                state.featuredProducts = action.payload;
            })
            .addCase(getFeaturedProductsThunk.rejected,(state,action) => {
                state.status = "Failed"
                state.error = action.payload;
            })
    }
});

export default productSlice.reducer;
