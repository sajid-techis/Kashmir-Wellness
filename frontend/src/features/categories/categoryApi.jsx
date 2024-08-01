import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getCategories = async (filters ={} ) => {
    try {
    const response = await api.get('/category/get',{params: filters})
    return response.data.categories
} catch (error) {
    throw new Error(error.message)
}
}