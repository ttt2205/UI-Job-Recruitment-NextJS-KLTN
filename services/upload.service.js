import axiosClient from "./axiosClient";

const API_BACKEND_UPLOAD_IMAGE = process.env.NEXT_PUBLIC_API_BACKEND_UPLOAD_IMAGE;

export const uploadImageCompany = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${API_BACKEND_UPLOAD_IMAGE}/image/company`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_UPLOAD_IMAGE}/image/company:`, error);
        throw error;
    }
}

export const uploadLogoCompany = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${API_BACKEND_UPLOAD_IMAGE}/logo/company`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_UPLOAD_IMAGE}/logo/company:`, error);
        throw error;
    }
}

export const deleteLogoCompany = async (id, file) => {
    try {
        const res = await axiosClient.delete(`${API_BACKEND_UPLOAD_IMAGE}/logo/company/${id}`, {
            data: {
                filename: file
            }
        });
        console.log("res delete logo company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_UPLOAD_IMAGE}/logo/company/${id}:`, error);
        throw error;
    }
}

export const deleteImageCompany = async (id, file) => {
    try {
        const res = await axiosClient.delete(`${API_BACKEND_UPLOAD_IMAGE}/image/company/${id}`, {
            data: {
                filename: file
            }
        });
        console.log("res delete image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_UPLOAD_IMAGE}/image/company/${id}:`, error);
        throw error;
    }
}