import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, loginUser, registerUser } from "./userApi";
import { toast } from "react-toastify";


export const registerUserThunk = createAsyncThunk(
    '/user/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await registerUser(userData);
        toast.success('Registration Successful');
  
        // Extract token from response
        const { token } = response;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
  
        return response;
      } catch (error) {
        toast.error(error.response?.data?.error || 'Registration failed!');
        return rejectWithValue(error.message);
      }
    }
  );
  

export const loginUserThunk = createAsyncThunk('/users/login', async (userData, {rejectWithValue}) => {
    try {
        const response = await loginUser(userData);
        const {token} = response;
        localStorage.setItem('token', token);
        toast.success("Logged In Successfully")
        return response
    } catch (error) {
        toast.error(error.response?.data?.error || 'Login failed!');
        return rejectWithValue(error.message);
    }
})

export const getUserProfileThunk = createAsyncThunk('users/profile', async (token,{rejectWithValue}) => {
    try {
        const response = await getUserProfile(token);
        return response;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


const userSlice = createSlice({
    name: "User",
    initialState: {
        userInfo: null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
    },
    reducers:{
        setUser(state,action) {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        },
        clearUser(state) {
            state.userInfo = null;
            state.token = null;
        },
        setStatus(state,action){
            state.status = action.payload;
        },
        setError(state,action) {
            state.error = action.payload;
        },
        logout(state) {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUserThunk.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(registerUserThunk.fulfilled,(state,action) => {
            state.status = "Success",
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        })
        .addCase(registerUserThunk.rejected,(state,action) => {
            state.status="Failed",
            state.error = action.payload
        })
        .addCase(loginUserThunk.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(loginUserThunk.fulfilled,(state,action) => {
            state.status = "Success",
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
        })
        .addCase(loginUserThunk.rejected,(state,action) => {
            state.status = "Failed";
            state.error = action.payload;
        })
        .addCase(getUserProfileThunk.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(getUserProfileThunk.fulfilled,(state,action) => {
            state.status = "Success";
            state.userInfo= action.payload;
        })
        .addCase(getUserProfileThunk.rejected,(state,action) => {
            state.status = "Rejected";
            state.error = action.payload;
        })
    }
})

export const {setUser,clearUser,setStatus,setError,logout} = userSlice.actions;
export default userSlice.reducer;