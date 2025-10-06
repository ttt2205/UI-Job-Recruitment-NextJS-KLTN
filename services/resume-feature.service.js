import axiosClient from "../services/axiosClient";

const API_BACKEND_RESUME = process.env.NEXT_PUBLIC_API_BACKEND_RESUME;

export const getResumesByCandidateId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_RESUME}/candidate/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_RESUME}}/candidate/${id}: `, error);
        throw error;
    }
}