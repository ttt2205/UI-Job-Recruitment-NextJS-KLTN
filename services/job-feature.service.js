import axiosClient from "../services/axiosClient";

const API_BACKEND_JOB = process.env.NEXT_PUBLIC_API_BACKEND_JOB

export const getJobsPaginationForCandidate = async (pagination) => {
    try {
        const {
            page,
            size,
            sort,
            keyword,
            location,
            category,
            jobTypeSelect,
            datePosted,
            experienceSelect,
            salary, } = pagination;
        const res = await axiosClient.get(`${API_BACKEND_JOB}`, {
            params: {
                page, // ?page=1
                size, // &size=10
                sort,
                search: keyword,
                location: location,
                category: category,
                type: jobTypeSelect,
                datePosted: datePosted,
                experience: experienceSelect,
                ...(salary !== null && {
                    min: salary.min,
                    max: salary.max,
                    currency: salary.currency
                })
            },
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}: `, error);
        throw error;
    }
}

export const getListCategory = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/category-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/category-list: `, error);
        throw error;
    }
}

export const getCategoryListByCompanyId = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/category-list/company/${id}`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/category-list/company/${id}: `, error);
        throw error;
    }
}

export const getListSkill = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/skill-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/skill-list: `, error);
        throw error;
    }
}

export const getListCities = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/city-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/city-list: `, error);
        throw error;
    }
}

export const getMaxSalaryWithCurrency = async (currency) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/max-salary`, {
            params: {
                currency: currency
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/max-salary: `, error);
        throw error;
    }
}

export const getListSalaryForFilter = async (currency) => {
    try {
        const res = await getMaxSalaryWithCurrency(currency);
        const maxSalary = res?.data || 0;
        if (maxSalary !== 0) {
            const numbers = [1, 2, 3, 4];
            const skip = Math.ceil(maxSalary / 4);
            const listFilterSalary = numbers.reduce((accumulator, _, index) => {
                const min = index * skip;
                const max = (index + 1) * skip;
                accumulator.push({ min, max })
                return accumulator;
            }, []);
            return listFilterSalary;
        } else {
            return [{ min: 0, max: 0 }];
        }
    } catch (error) {
        console.error(`Lỗi khi tạo listFilterSalary: `, error);
        throw error;
    }
}

export const getJobById = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/detail/${id}`);
        console.log("jobById: ", res);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/{id}: `, error);
        throw error;
    }
}

export const getRelatedJobs = async (params) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/related-jobs/${params?.id}`, {
            params: {
                industry: params?.industry,
                country: params?.country,
                city: params?.city
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/related-jobs/{id}: `, error);
        throw error;
    }
}

export const createJob = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND_JOB}`, data);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}: `, error);
        throw error;
    }
}

export const getJobsByCompanyIdForDashboard = async (companyId, page, size, category, datePosted) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/get-list/dashboard/company/${companyId}`, {
            params: {
                page,
                size,
                category,
                datePosted,
            }
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/get-list/dashboard/company/${companyId}: `, error);
        throw error;
    }
}