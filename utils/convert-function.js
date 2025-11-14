import { jobTypeOptions, styleMap } from "@/data/job-type";
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
 * Convert type (string) → { styleClass, type }
 */
export const convertJobType = (type) => {
    const styleClass = styleMap[type];
    return styleClass ? { value: { styleClass, type }, label: type } : null;
};

/**
 * Convert multiple jobs from server → formatted jobs for UI
 */
export const formatJobResults = (arrJob) => {
    return arrJob.map(item => ({
        ...item,
        jobTypes: item.jobTypes?.map(convertJobType).filter(Boolean) || [],
    }));
};