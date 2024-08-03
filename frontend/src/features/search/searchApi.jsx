import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getSearch = async (search) => {
  try {
    const response = await api.get(`/search?search=${search}`);
    return response.data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};
