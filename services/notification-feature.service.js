import axiosClient from "./axiosClient";

// const API_BACKEND_NOTIFICATION = "http://localhost:3002/api/v1/notification";
const API_BACKEND_NOTIFICATION = process.env.NEXT_PUBLIC_API_BACKEND_NOTIFICATION;

export const getJobNotificationsByUserId = async (userId, size = null) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_NOTIFICATION}/jobs/${userId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_NOTIFICATION}/jobs/${userId}:`, error);
        throw error;
    }
}