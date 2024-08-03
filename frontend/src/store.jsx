import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice'
import categoriesReducer from './features/categories/categorySlice'
import productReducer from './features/products/productSlice'
import doctorReducer from './features/doctors/doctorSlice';
import labReducer from './features/labs/labSlice';
import searchReducer from './features/search/searchSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoriesReducer,
        product:productReducer,
        doctor: doctorReducer,
        lab: labReducer,
        search: searchReducer,
    }
})

export default store;


