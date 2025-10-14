import axiosClient from "./axiosClient";

const API_BACKEND_CANDIDATE = "";

export const getListCadidates = async (pagination) => {
    try {
        const {
            page,
            size,
            keyword,
            status,
            educationLevel,
            industryLevel,
            candidateGender,
            experienceLevel,
            location
        } = pagination;

        const res = await axiosClient.get(API_BACKEND_CANDIDATE, {
            params: {
                page,
                size,
                keyword,
                status,
                education: educationLevel,
                industry: industryLevel,
                gender: candidateGender,
                experience: experienceLevel,
                location
            }
        });
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getListCadidates");
        throw error;
    }
}