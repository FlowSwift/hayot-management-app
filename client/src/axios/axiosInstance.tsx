import axios from 'axios';
import Cookies from 'js-cookie';


const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Set your API base URL
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;