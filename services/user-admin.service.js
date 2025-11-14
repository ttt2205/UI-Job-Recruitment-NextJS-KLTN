import axiosClient from "./axiosClient";

const API_BACKEND_USER = process.env.NEXT_PUBLIC_API_BACKEND_USER_ADMIN;

export const getListUsers = async (pagination) => {
    try {
        const { page, size, search, sort, status } = pagination;

        const res = await axiosClient.get(API_BACKEND_USER, {
            params: { page, size, sort, search, status },
        });
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getListUsers:", error);
        throw error;
    }
};

export const patchLockUser = async (id) => {
    try{
        const res = await axiosClient.patch(`${API_BACKEND_USER}/${id}/lock`);
        return res;
    }catch(error){
         console.error("Lỗi fetchApi patchLockUser:", error);
        throw error;
    }
}

export const getUserStatusStatistic = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_USER}/statistics`);
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getUserStatusStatistic:", error);
        throw error;
    }
}