export const normalize = (str) =>
    str.trim().toLowerCase().replace(/\s+/g, ""); // bỏ khoảng trắng, chữ thường

export const formatDateToHHmm = (date) => {
    if (!(date instanceof Date)) return "";

    const hours = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    return `${hours}:${minutes}`;
}

// Check date
export const checkDates = (start, end) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset về đầu ngày

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    if (startDate && startDate > today) {
        toast.error("Ngày bắt đầu không được sau ngày hiện tại.");
        return false;
    }

    if (startDate && endDate && startDate > endDate) {
        toast.error("Ngày bắt đầu không được sau ngày kết thúc.");
        return false;
    }

    return true;
};