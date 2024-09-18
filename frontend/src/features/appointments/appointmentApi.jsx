import axios from "axios";

// Base URL (from your .env file)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Book an appointment
export const bookAppointment = async (doctorId, patientData) => {
    try {
        const response = await api.post(`/appointments/${doctorId}/book-appointment`, patientData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error booking appointment');
    }
};

// Get appointments for a patient
export const getAppointmentsForPatient = async (patientId) => {
    try {
        const response = await api.get(`/appointments/patients/${patientId}/appointments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching appointments');
    }
};
