// import axios from 'axios';
// import { BASE_URL } from "./apiPath";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   // withCredentials: true,
//   timeout:80000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   }, 
// });


// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log("Unauthorized - redirect to login");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from 'axios';
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  withCredentials: true, // Required for cookies to be sent in requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - redirect to login");
      window.location.href = '/';
    }
    else if(error.response && error.response.status === 500){
      console.error("Server error. Please try again later");
    }
    else if(error.code === "ECONNABORTED"){
      console.error("Request timeout. Please try again");
      
    }
  
    return Promise.reject(error);
  }
);

export default axiosInstance;
