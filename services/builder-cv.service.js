import axiosClient from "./axiosClient";

const API_BACKEND_AI_CV = process.env.NEXT_PUBLIC_API_BACKEND_AI_CV;

export const generateCV = async (info) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_AI_CV}/improve`, info);
        return res;
    } catch (error) {   
        console.error(`Lỗi khi gọi API ${API_BACKEND_AI_CV}/improve:`, error);
        throw error;
    }
}