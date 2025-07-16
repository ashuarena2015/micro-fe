import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
});

console.log('Axios baseURL ChildApp:', axiosInstance.defaults.baseURL);

export default axiosInstance;
