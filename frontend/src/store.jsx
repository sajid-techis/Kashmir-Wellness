import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice'
import categoriesReducer from './features/categories/categorySlice'
import productReducer from './features/products/productSlice'
import doctorReducer from './features/doctors/doctorSlice';
import labReducer from './features/labs/labSlice';
import searchReducer from './features/search/searchSlice'
import cartReducer from './features/carts/cartSlice'
import appointmentReducer from './features/appointments/appointmentSlice'
import specialtyReducer from './features/specialties/specialtySlice'
import labAppointmentReducer from './features/labAppointment/labAppointmentSlice'



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
        specialty:specialtyReducer,
        labAppointment: labAppointmentReducer,
    }
})

export default store;


