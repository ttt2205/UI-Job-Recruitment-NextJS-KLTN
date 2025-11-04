import axiosClient from "./axiosClient";
import jwt from 'jsonwebtoken';

const API_BACKEND_AUTH = process.env.NEXT_PUBLIC_API_BACKEND_AUTH;

export const getAccount = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_AUTH}/account`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AUTH}/account:`, error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_AUTH}/login`, {
            email,
            password
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AUTH}/login:`, error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_AUTH}/logout`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AUTH}/logout:`, error);
        throw error;
    }
}

export const register = async ({ email, password, role }) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_AUTH}/register`, {
            email,
            password,
            role
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AUTH}/register:`, error);
        throw error;
    }
}

/**
 * Hàm kiểm tra quyền truy cập từ token JWT
 * Chạy ở server side
 */
export const isAuthorized = (token, role) => {
    try {
        console.log("Verifying token:", token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("payload:", payload);
        return payload?.role === role;
    } catch (error) {
        console.error("JWT verification failed:", error.name, "-", error.message);
        return false;
    }
};

