// import axios from 'axios';

// export const config = {
// 	baseURL: "https://jsonplaceholder.typicode.com",
// };
// const axiosInstance = axios.create(config);

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003', // 👈 onboarding server port
});

export default axiosInstance;
