// // src/api/axiosInstance.js
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { clearToken, isTokenValid } from "../components/hooks/auth";
// import { errorNotification } from "../components/hooks/NotificationService";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000", // Change to your API base
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token && isTokenValid()) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else if (token && !isTokenValid()) {
//       clearToken();
//       errorNotification("Session Expired", "Please log in again.");
//       window.location.href = "/login"; // Direct fallback
//       return Promise.reject("Token expired");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add a response interceptor (optional - for handling global 401 errors)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       clearToken();
//       errorNotification("Unauthorized", "Please log in again.");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
