import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getLabs = async (filters={}) => {
    try {
        const response = await api.get('/labs/get',{params:filters});
        return response.data.labs
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getFeaturedLabs = async() => {
    try {
        const response = await api.get('/labs/featured');
        return response.data.featuredLabs
    } catch (error) {
        throw new Error(error.message);
    }
}