import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


export const getFeaturedDoctors = async () => {
    try {
        const response = await api.get('doctors/featured');
        return response.data.featuredDoctors;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDoctorsBySpecialties = async (specialtyId) => {
    try {
        const response = await api.get(`/doctors/by-specialty/${specialtyId}`);
        return response.data.doctors;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const bookAppointment = async (doctorId, patientData) => {
    try {
        const response = await api.post(`/appointments/${doctorId}/book-appointment`, patientData);
        return response.data.appointment;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/doctors/${doctorId}`);
        console.log(response.data.doctor)
        return response.data.doctor;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getAppointmentsByDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/doctors/${doctorId}/appointments`);
        return response.data.appointments;
    } catch (error) {
        throw new Error(error.message);
    }
};


