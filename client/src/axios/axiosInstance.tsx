import axios from 'axios';
import Cookies from 'js-cookie';

let cancelTokenSource = axios.CancelToken.source();

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Set your API base URL
});

apiClient.interceptors.request.use((config) => {
  const shouldCancel = config.headers['X-Cancel-Request']

  if (shouldCancel) {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled by the user');
    }
    cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;
  }


  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;