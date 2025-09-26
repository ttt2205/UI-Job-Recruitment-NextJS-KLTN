import axiosClient from "./axiosClient";

const API_BACKEND_CANDIDATE_ABOUT = process.env.NEXT_PUBLIC_API_BACKEND_CANDIDATE_ABOUT;

export const getCandidateSectionByCandidateId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE_ABOUT}/details/candidate/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE_ABOUT}/details/candidate/${id}:`, error);
        throw error;
    }
}

export const createCandidateSection = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_CANDIDATE_ABOUT}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE_ABOUT}:`, error);
        throw error;
    }
}

export const updateCandidateSection = async (id, data) => {
    try {
        const res = await axiosClient.patch(`${API_BACKEND_CANDIDATE_ABOUT}/${id}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE_ABOUT}:`, error);
        throw error;
    }
}

