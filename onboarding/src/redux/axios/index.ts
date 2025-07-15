import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // onboarding backend
});

console.log('Axios baseURL:', axiosInstance.defaults.baseURL);

export default axiosInstance;
