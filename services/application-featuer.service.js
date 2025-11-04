import axiosClient from "./axiosClient";

const API_BACKEND_APPLICATION = process.env.NEXT_PUBLIC_API_BACKEND_APPLICATION;

export const createApplication = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_APPLICATION}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}:`, error);
        throw error;
    }
}

export const checkApplication = async ({ candidateId, jobId }) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_APPLICATION}/check`, {
            params: { candidateId, jobId }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}:`, error);
        throw error;
    }
}

export const getApplicationsByCandidateIdForDashboard = async (candidateId, page, size, datePosted, status) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_APPLICATION}/get-list/dashboard/candidate/${candidateId}`, {
            params: {
                page,
                size,
                datePosted,
                status
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}/get-list/dashboard/candidate/${candidateId}: `, error);
        throw error;
    }
}
