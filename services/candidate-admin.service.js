import axiosClient from "./axiosClient";

const API_BACKEND_CANDIDATE = process.env.NEXT_PUBLIC_API_BACKEND_CANDIDATE_ADMIN;

export const getListCadidates = async (pagination) => {
    try {
        const {
            page,
            size,
            search,
            sort,
            gender,
            status
        } = pagination;

        const res = await axiosClient.get(API_BACKEND_CANDIDATE, {
            params: {
                page,
                size,
                sort,
                search,
                gender,
                status
            },
        });
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getListCadidates:", error);
        throw error;
    }
};

export const getDetailCandidate = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/details/${id}`);
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getDetailCandidate:", error);
        throw error;
    }
}

export const patchLock = async (id) => {
    try {
        const res = await axiosClient.patch(`${API_BACKEND_CANDIDATE}/${id}/lock`);
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi patchLock:", error);
        throw error;
    }
}

export const getCandidateStatusStatistic = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_CANDIDATE}/statistics`);
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getCandidateStatusStatistic:", error);
        throw error;
    }
}