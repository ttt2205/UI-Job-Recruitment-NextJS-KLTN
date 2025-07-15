import axiosClient from "../services/axiosClient";

const API_BACKEND_JOB = process.env.NEXT_PUBLIC_API_BACKEND_JOB

export const getListJobPagination = async (pagination) => {
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
        const res = await axiosClient.get(API_BACKEND_JOB, {
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
                    max: salary.max
                })
            },
        });
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}:`, error);
        throw error;
    }
}

export const getListCategory = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/category-list`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/category-list:`, error);
        throw error;
    }
}

export const getMaxSalary = async () => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/max-salary`);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/max-salary:`, error);
        throw error;
    }
}

export const getListSalaryForFilter = async () => {
    try {
        const res = await getMaxSalary();
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
        console.error(`Lỗi khi tạo listFilterSalary:`, error);
        throw error;
    }
}

export const getJobById = async (id) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND_JOB}/detail/${id}`);
        console.log("jobById: ", res);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/{id}:`, error);
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
        console.log("relatedJobs res: ", res);
        return res;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${API_BACKEND_JOB}/related-jobs/{id}:`, error);
        throw error;
    }
}