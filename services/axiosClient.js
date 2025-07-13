// utils/axiosClient.js
import axios from 'axios';

// Tạo instance mặc định
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor request: tự động gắn token nếu có
axiosClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response: xử lý lỗi chung
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Có thể xử lý lỗi chung ở đây, ví dụ:
            if (error.response.status === 401) {
                console.warn("Unauthorized - Token hết hạn?");
                // Có thể logout tại đây nếu cần
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
