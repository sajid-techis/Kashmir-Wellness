import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getSpecialties = async () => {
    try {
        const response = await api.get('doctors/specialties');
        return response.data.specialties;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getFeaturedDoctors = async () => {
    try {
        const response = await api.get('doctors/featured');
        return response.data.featuredDoctors;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDoctorsBySpecialties = async (specialty) => {
    try {
        const response = await api.get(`/doctors/by-specialty/${specialty}`);
        return response.data.doctors;
    } catch (error) {
        throw new Error(error.message)
    }
} 

