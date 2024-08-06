import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Add Item to Cart
export const addItemToCart = async (data, token) => {
    try {
        const response = await api.post('/cart/add', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};

// Update Cart Item
export const updateCartItem = async (data, token) => {
    try {
        const response = await api.put('/cart/update', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};

// Remove Item from Cart
export const removeCartItem = async (productId, token) => {
    try {
        const response = await api.delete('/cart/remove', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { productId } 
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};

// Get Cart Items
export const getCartItems = async (token) => {
    try {
        const response = await api.get('/cart/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
    }
};
