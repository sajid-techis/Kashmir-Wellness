import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getSpecialties = async () => {
  try {
    const response = await api.get('/specialties');
    return response.data.specialties;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSpecialtyById = async (specialtyId) => {
  try {
    const response = await api.get(`/specialties/${specialtyId}`);
    return response.data.specialty;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSpecialty = async (specialtyData) => {
  try {
    const response = await api.post('/specialties/create', specialtyData);
    return response.data.specialty;
  } catch (error) {
    throw new Error(error.message);
  }
};
