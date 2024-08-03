// features/products/productApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


//Api Call for All Products
export const getProducts = async (categoryId) => {
    try {
        const response = await api.get('/products/get', {
            params: { category: categoryId }
        });
        return response.data.products;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Api Call for Product Details
export const getProductDetails = async (id) => {
    try {
        const response = await api.get(`/products/get/${id}`);
        return response.data.product;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Api call for featured Products
export const getFeaturedProducts = async () => {
    try {
        const response = await api.get('/products/featured-products');
        return response.data.featuredProducts;
    } catch (error) {
        throw new Error(error.message)
    }
}
