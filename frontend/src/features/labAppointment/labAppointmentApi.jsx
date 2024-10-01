import axios from "axios";

// Create the base API instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Get lab appointments for a specific patient
export const getLabAppointments = async (patientId) => {
    try {
        const response = await api.get(`/labAppointments/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create a new lab appointment
export const createLabAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/labAppointments', appointmentData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
