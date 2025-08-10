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