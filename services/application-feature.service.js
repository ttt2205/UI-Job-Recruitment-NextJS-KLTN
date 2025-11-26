import { data } from "@/components/dashboard-pages/candidates-dashboard/dashboard/components/ProfileChart";
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
        const res = await axiosClient.get(`${API_BACKEND_APPLICATION}/all/dashboard/candidate/${candidateId}`, {
            params: {
                page,
                size,
                datePosted,
                status
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}/all/dashboard/candidate/${candidateId}: `, error);
        throw error;
    }
}

export const getApplicantsAppliedByJobId = async (jobId) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_APPLICATION}/applicants/job/${jobId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}/applicants/job/${jobId}: `, error);
        throw error;
    }
}


export const updateStatusOfApplicantByJobIdAndApplicationId = async (applicationId, status) => {
    try {
        const res = await axiosClient.patch(`${API_BACKEND_APPLICATION}/${applicationId}/status`, {
            status
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_APPLICATION}/${applicationId}/status: `, error);
        throw error;
    }
}

