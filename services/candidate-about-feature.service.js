import axiosClient from "./axiosClient";

const API_BACKEND_CANDIDATE_ABOUT = process.env.NEXT_PUBLIC_API_BACKEND_CANDIDATE_ABOUT;

export const getCandidateAboutByUserId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE_ABOUT}/details/user/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE_ABOUT}/details/user/${id}:`, error);
        throw error;
    }
}