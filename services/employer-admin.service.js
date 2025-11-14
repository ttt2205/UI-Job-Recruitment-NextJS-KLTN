import axiosClient from "./axiosClient";

const API_BACKEND_EMPLOYER = process.env.NEXT_PUBLIC_API_BACKEND_EMPLOYER_ADMIN;

export const getListEmployers = async (pagination) => {
    try {
        const { page, size, search, sort, status } = pagination;

        const res = await axiosClient.get(API_BACKEND_EMPLOYER, {
            params: { page, size, sort, search, status },
        });
        return res;
    } catch (error) {
        console.error("Lỗi fetchApi getListEmployers:", error);
        throw error;
    }
};

export const patchLockEmployer = async (id) => {
    try{
        const res = await axiosClient.patch(`${API_BACKEND_EMPLOYER}/${id}/lock`);
        return res;
    }catch(error){
         console.error("Lỗi fetchApi patchLockEmployer:", error);
        throw error;
    }
}