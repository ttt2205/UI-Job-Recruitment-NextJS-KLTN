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

/**
 * Hàm kiểm tra quyền truy cập từ token JWT
 */
export const isAuthorized = (token, type) => {
    try {
        console.log(`isAuthorized`)
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("payload: ", payload);
        return payload?.type === type;
    } catch (error) {
        return false;
    }
}
