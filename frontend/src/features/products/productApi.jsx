// features/products/productApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getProducts = async (categoryId = '', limit = 6) => {
    try {
        const response = await api.get('/products/get', {
            params: { category: categoryId, limit }
        });
        return response.data.products;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProductDetails = async (id) => {
    try {
        const response = await api.get(`/products/get/${id}`);
        return response.data.product;
    } catch (error) {
        throw new Error(error.message);
    }
};
