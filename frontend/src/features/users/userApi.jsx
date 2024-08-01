import axios from "axios";



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register',userData);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || ' An error occurred')
    }
}

//Login User

export const loginUser = async (userData) => {
    try {
        const response = await api.post('users/login',userData);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || ' Invalid Credentials')
    }
}

//Profile User

export const getUserProfile = async (token) => {
    try {
        const response = await api.get('users/profile', {
            headers: {
                Authorization : `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error) {
        throw new Error(error.response.data.message) || "An error Occurred"
    }
}



