import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice'
import categoriesReducer from './features/categories/categorySlice'
import productReducer from './features/products/productSlice'
import doctorReducer from './features/doctors/doctorSlice';
import labReducer from './features/labs/labSlice';
import searchReducer from './features/search/searchSlice'
import cartReducer from './features/carts/cartSlice'
import appointmentReducer from './features/appointments/appointmentSlice'



const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoriesReducer,
        product:productReducer,
        doctor: doctorReducer,
        lab: labReducer,
        search: searchReducer,
        cart: cartReducer,
        appointments: appointmentReducer,
    }
})

export default store;


