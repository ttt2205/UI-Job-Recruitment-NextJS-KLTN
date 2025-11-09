import axiosClient from "./axiosClient";

const NEXT_PUBLIC_API_BACKEND_UPLOAD = process.env.NEXT_PUBLIC_API_BACKEND_UPLOAD;

// <!-- Company -->
export const uploadImageCompany = async (companyId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/company/${companyId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/company:`, error);
        throw error;
    }
}

export const uploadLogoCompany = async (companyId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company/${companyId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company:`, error);
        throw error;
    }
}

export const deleteLogoCompany = async (id, file) => {
    try {
        const res = await axiosClient.delete(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company/${id}`, {
            data: {
                filename: file
            }
        });
        console.log("res delete logo company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company/${id}:`, error);
        throw error;
    }
}

export const deleteImageCompanyById = async (imageId) => {
    try {
        const res = await axiosClient.delete(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/${imageId}/company`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/${imageId}/company:`, error);
        throw error;
    }
}

export const getLogoOfCompanyById = async (id) => {
    try {
        const res = await axiosClient.get(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company/${id}`);
        console.log("res get logo company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/logo/company/${id}:`, error);
        throw error;
    }
}

export const getImagesOfCompanyById = async (id) => {
    try {
        const res = await axiosClient.get(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/images/company/${id}`);
        console.log("res get images company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/images/company/${id}:`, error);
        throw error;
    }
}

// <!-- Candidate -->
export const uploadImageCandidate = async (candidateId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/candidate/${candidateId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/candidate:`, error);
        throw error;
    }
}

export const uploadAvatarCandidate = async (candidateId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate/${candidateId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate:`, error);
        throw error;
    }
}

export const uploadCVCandidate = async (candidateId, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // 'file' là key trùng với @UploadedFile('file')

        const res = await axiosClient.post(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/resume/candidate/${candidateId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("res upload image company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/resume/candidate/:id:`, error);
        throw error;
    }
}

export const deleteAvatarCandidate = async (id) => {
    try {
        const res = await axiosClient.delete(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate/${id}`, {
            data: {
                filename: file
            }
        });
        console.log("res delete logo company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate/${id}:`, error);
        throw error;
    }
}

export const deleteCVCandidate = async (id) => {
    try {
        const res = await axiosClient.delete(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/resume/${id}`);
        console.log("res delete logo company: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/resume/${id}:`, error);
        throw error;
    }
}

export const deleteImageCandidateById = async (imageId) => {
    try {
        const res = await axiosClient.delete(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/${imageId}/candidate`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/image/${imageId}/candidate:`, error);
        throw error;
    }
}

export const getAvatarOfCandidateById = async (id) => {
    try {
        const res = await axiosClient.get(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate/${id}`);
        console.log("res get logo candidate: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/avatar/candidate/${id}:`, error);
        throw error;
    }
}

export const getImagesOfCandidateById = async (id) => {
    try {
        const res = await axiosClient.get(`${NEXT_PUBLIC_API_BACKEND_UPLOAD}/images/candidate/${id}`);
        console.log("res get images candidate: ", res)
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${NEXT_PUBLIC_API_BACKEND_UPLOAD}/images/candidate/${id}:`, error);
        throw error;
    }
}

