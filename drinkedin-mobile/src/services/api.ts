import axios from 'axios';
import { getToken } from './storage';

// We hardcode the local IP for the mobile device to hit the host machine's backend
const API_URL = 'http://10.166.197.249:3000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken('userToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
