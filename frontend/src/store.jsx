import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice'
import categoriesReducer from './features/categories/categorySlice'
import productReducer from './features/products/productSlice'
import doctorSlice from './features/doctors/doctorSlice';
import labSlice from './features/labs/labSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoriesReducer,
        product:productReducer,
        doctor: doctorSlice,
        lab: labSlice
    }
})

export default store;


