import axios from 'axios';

export const config = {
	baseURL: "https://jsonplaceholder.typicode.com",
};
const axiosInstance = axios.create(config);

export default axiosInstance;
