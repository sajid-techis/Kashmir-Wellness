import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addItemToCart, updateCartItem, removeCartItem, getCartItems } from "./cartsApi";

export const addItemToCartThunk = createAsyncThunk(
    'cart/addItem',
    async ({ productId, quantity }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await addItemToCart({ productId, quantity }, token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartItemThunk = createAsyncThunk(
    'cart/updateItem',
    async ({ productId, quantity }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await updateCartItem({ productId, quantity }, token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeItemFromCartThunk = createAsyncThunk(
    'cart/removeItem',
    async ({ productId }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await removeCartItem(productId, token);
            return response; // Ensure this returns the expected structure
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getCartItemsThunk = createAsyncThunk(
    'cart/getItems',
    async (_, { rejectWithValue, getState }) => {
      const token = getState().user.token;
      try {
        const response = await getCartItems(token);
        return response;
      } catch (error) {
        // If "Cart not found", return an empty cart object instead of rejecting
        if (error.message === "Cart not found") {
          return { items: [], total: 0 }; 
        }
        return rejectWithValue(error.message);
      }
    }
  );
  

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearCart(state) {
            state.items = [];
            state.total = 0;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addItemToCartThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addItemToCartThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload.items;
            state.total = action.payload.total;
        })
        .addCase(addItemToCartThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(updateCartItemThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCartItemThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload.items.map(item => {
                const product = state.items.find(p => p.productId._id === item.productId) || {};
                return { ...item, productId: { ...product.productId, _id: item.productId } };
            });
            state.total = action.payload.total;
        })
        .addCase(updateCartItemThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(removeItemFromCartThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(removeItemFromCartThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload.items;
            state.total = action.payload.total;
        })
        .addCase(removeItemFromCartThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(getCartItemsThunk.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCartItemsThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload.items;
            state.total = action.payload.total;
        })
        .addCase(getCartItemsThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
