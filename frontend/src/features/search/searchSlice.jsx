// features/search/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from './searchApi';


// Create an async thunk for search
export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const results = await getSearch(searchTerm);
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: {
      products: [],
      labs: [],
      doctors: [],
      categories: []
    },
    loading: false,
    error: null
  },
  reducers: {
    setSearchResults(state, action) {
        state.results = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearSearchResults(state) {
        state.results = null;
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  }
});

export const { setSearchResults, setLoading, setError, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
