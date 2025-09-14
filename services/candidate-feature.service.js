import axiosClient from "../services/axiosClient";

const API_BACKEND_CANDIDATE = process.env.NEXT_PUBLIC_API_BACKEND_CANDIDATE;

export const getListCandidatePagination = async (pagination) => {
    try {
        const {
            page,
            size,
            sort,
            keyword,
            location,
            category,
            experienceLevel,
            educationLevel,
            candidateGender,
        } = pagination;
        const res = await axiosClient.get(API_BACKEND_CANDIDATE, {
            params: {
                page,
                size,
                sort,
                search: keyword,
                location,
                industry: category,
                experience: experienceLevel,
                education: educationLevel,
                gender: candidateGender
            },
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}:`, error);
        throw error;
    }
}

export const getCandidateById = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/details/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/details/${id}:`, error);
        throw error;
    }
}

export const getIndustryListOfCandidate = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/industry-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/industry-list:`, error);
        throw error;
    }
}

export const getCandidateByUserId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/details/user/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/details/user/${id}:`, error);
        throw error;
    }
}

export const getIndustryOfCandidateList = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/industry-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/industry-list:`, error);
        throw error;
    }
}

export const getListSkill = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/skill-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/skill-list: `, error);
        throw error;
    }
}

export const updateInfo = async (id, data) => {
    try {
        const res = await axiosClient.patch(`${API_BACKEND_CANDIDATE}/${id}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_CANDIDATE}/skill-list: `, error);
        throw error;
    }
}