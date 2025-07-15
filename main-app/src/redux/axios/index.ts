import axios from 'axios';

export const config = {
	baseURL: "http://localhost:3001", // Update with your backend URL
	withCredentials: true 
};

const axiosInstance = axios.create(config);

console.log('Axios baseURL:', axiosInstance.defaults.baseURL);

export default axiosInstance;
