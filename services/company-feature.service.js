import axiosClient from "../services/axiosClient";

const API_BACKEND_COMPANY = process.env.NEXT_PUBLIC_API_BACKEND_COMPANY

export const getListCompanyPagination = async (pagination) => {
    try {
        const {
            page,
            size,
            sort,
            keyword,
            location,
            category,
            foundationDate } = pagination;
        const res = await axiosClient.get(API_BACKEND_COMPANY, {
            params: {
                page, // ?page=1
                size, // &size=10
                sort,
                search: keyword,
                location,
                primaryIndustry: category,
                foundationDateMin: foundationDate.min,
                foundationDateMax: foundationDate.max,
            },
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}:`, error);
        throw error;
    }
}

export const getCompanyById = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/details/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/details/${id}:`, error);
        throw error;
    }
}

export const getRelatedJobsByCompanyId = async (companyId) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/related-jobs/${companyId}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/related-jobs/${id}:`, error);
        throw error;
    }
}

export const getCompanyByUserId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/details/user/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/details/user/${id}:`, error);
        throw error;
    }
}

export const updatePartialCompany = async (id, data) => {
    try {
        const res = await axiosClient.patch(`${API_BACKEND_COMPANY}/${id}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/${id}:`, error);
        throw error;
    }
}

export const getIndustryOfCompanyList = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/industry-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/industry-list:`, error);
        throw error;
    }
}

/**
 * Kiểm tra xem ứng viên đã được lưu là tiềm năng hay chưa
 * @param {number} employerId 
 * @param {number} candidateId 
 * @returns {Promise<boolean>} true nếu đã lưu, false nếu chưa
 */
export const checkPotentialCandidate = async (employerId, candidateId) => {
    try {
        const res = await axiosClient.get(
            `${API_BACKEND_COMPANY}/${employerId}/potential-candidates/${candidateId}`
        );
        return res;
    } catch (error) {
        console.error(
            `Lỗi khi gọi API checkPotentialCandidate: ${employerId} / ${candidateId}`,
            error
        );
        throw error;
    }
};

/**
 * Toggle trạng thái ứng viên tiềm năng (thêm/xóa)
 * @param {number} employerId 
 * @param {number} candidateId 
 * @returns {Promise<boolean>} true = added, false = removed
 */
export const togglePotentialCandidate = async (employerId, candidateId) => {
    try {
        const res = await axiosClient.post(
            `${API_BACKEND_COMPANY}/${employerId}/potential-candidates/${candidateId}/toggle`
        );
        return res;
    } catch (error) {
        console.error(
            `Lỗi khi gọi API togglePotentialCandidate: ${employerId} / ${candidateId}`,
            error
        );
        throw error;
    }
};

export const getPotentialCandidatesPagination = async (employerId, page, size, search) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/${employerId}/potential-candidates`, {
            params: {
                page, // ?page=1
                size, // &size=10
                search,
            },
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/${employerId}/potential-candidates:`, error);
        throw error;
    }
}

/**
 * 
 * @param {*} employerId 
 * @returns {Promise<{postedJobs: number, applications: number, messages: number, shortlist: number}>}
 */
export const getDashboardStatsByEmployerId = async (employerId) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_COMPANY}/${employerId}/dashboard-stats`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_COMPANY}/${employerId}/dashboard-stats:`, error);
        throw error;
    }
}