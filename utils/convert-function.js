import { jobTypeOptions } from "@/data/job-type";
import dayjs from "dayjs";

export const toTitleCase = (str = '') =>
    str
        .trim()
        .split(/\s+/) // dùng regex để xử lý nhiều dấu cách
        .map(word =>
            word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
        )
        .join(' ');

export const formatDate = (dateString, options) => {
    return dayjs(dateString).format(options);
};

export const convertStringToDateForCandidateSection = (dateString) => {
    if (!dateString || dateString === 'N/A') return null;
    let start = dateString.split(" - ")[0];
    let end = dateString.split(" - ")[1];

    start = new Date(start);
    if (end === "Present")
        end = null
    else
        end = new Date(end);

    return { start, end };
}

/**
 * Convert job from server to show UI
 */
const jobTypeMap = new Map(
    jobTypeOptions.map(opt => [opt.label, opt.value])
);

const convertJobType = (type) => {
    return jobTypeMap.get(type) || null;
};

export const formatJobData = (data) => {
    return {
        ...data,
        jobType: data.jobType.map((type) => convertJobType(type)),
    }
}

export const formatJobResults = (arrJob) => {
    return arrJob.map(item => ({
        ...item,
        jobType: item.jobType.map((type) => convertJobType(type)),
    }))
}