import axiosClient from './axiosClient';

const API_BACKEND_AI_CV = '/api/v1/ai-cv';

// export const generateCV = async (info) => {
//     // Tạo CV mới hoặc cải thiện CV hiện tại dựa vào info
//     try {
//         const res = await axiosClient.post(`${API_BACKEND_AI_CV}/generate`, info);
//         return res.data;
//     } catch (error) {
//         console.error(`Lỗi khi gọi API ${API_BACKEND_AI_CV}/generate:`, error);
//         throw error;
//     }
// };

export const improveCVForJob = async (jobId) => {
    // Cải thiện hoặc tạo CV dựa vào jobId
    try {
        const res = await axiosClient.post(`${API_BACKEND_AI_CV}/improve/job/${jobId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AI_CV}/improve/job/${jobId}:`, error);
        throw error;
    }
};

export const getCvHistoryByJobId = async (jobId) => {
    // Lấy danh sách tất cả CV của candidate
    try {
        const res = await axiosClient.get(`${API_BACKEND_AI_CV}/history`, {
            params: {
                jobId
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AI_CV}/history:`, error);
        throw error;
    }
};

export const getCvById = async (resumeId) => {
    // Lấy CV theo version/resumeId
    try {
        const res = await axiosClient.get(`${API_BACKEND_AI_CV}/${resumeId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_AI_CV}/${resumeId}:`, error);
        throw error;
    }
};

export const deleteCvById = async (resumeId) => {
    // Xóa CV theo version/resumeId
    try {
        const res = await axiosClient.delete(`${API_BACKEND_AI_CV}/${resumeId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API DELETE ${API_BACKEND_AI_CV}/${resumeId}:`, error);
        throw error;
    }
};
